import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Credenciales, Persona} from '../models';
import {PersonaRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');

@authenticate("admin")  //Seguridad para toda la clase, exige token
export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}

    //Metodo de autenticacion y generacion de token para la persona o veterinario y responder con un JSON que tenga el nombre, correo, id y token generado para ese usuario.
  @authenticate.skip()
  @post('/login', {
    responses: {
      '200': {
        descripcion: 'Autenticacion de usuarios',
      }
    }
  })
  async login(
    @requestBody() credenciales: Credenciales
  ){
    const p = await this.servicioAutenticacion.IdentificarPersona(credenciales.usuario, credenciales.clave);
    const v = await this.servicioAutenticacion.IdentificarVeterinario(credenciales.usuario, credenciales.clave);
    if(p){  //Si es persona genera token y lo muestra
      const token = this.servicioAutenticacion.GenerarTokenJWT(p);
      return {
        datos: {
          nombre: p.nombres,
          correo: p.correo,
          id: p.id,
        },
        tk: token
      }
    }else{  //Si es veterinario genera token y lo muestra
      if(v){
        const token = this.servicioAutenticacion.GenerarTokenJWTV(v);
        return {
          datos: {
            nombre: v.nombres,
            correo: v.correo,
            id: v.id,
          },
          tk: token
        }
      }else{
        throw new HttpErrors[401]("Datos Inválidos");
      }
    }
  }


  @post('/personas')
  @response(200, {
    description: 'Persona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersona',
            exclude: ['id'],
          }),
        },
      },
    })
    persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    // Vamos a modificar el retorno de esta funcion de creacion persona par que envie
    // un correo de confirmacion al usuario
    const clave = this.servicioAutenticacion.GenerarClave();
    const claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    persona.clave = claveCifrada;
    //Await para que espere un proceso anterior
    const p = await this.personaRepository.create(persona);

    //Ahora a notificar al usuario via correo electronico
    const email = persona.correo;
    const asunto = "PetFriend -- Registro de Usuario Completado!";
    const mensaje = `Hola ${persona.nombres}, su nombre de usuario es: ${persona.correo} y su contraseña es: ${clave}, perfil de Usuario.`;
    fetch(`${Llaves.urlServicioNotificaciones}/mail?email=${email}&asunto=${asunto}&mensaje=${mensaje}`)
    .then((data:any) => {
      console.log(data);
    })
    //Envío de confirmacion por sms
    const celular = persona.celular;
    fetch(`${Llaves.urlServicioNotificaciones}/sms?mensaje=${mensaje}&telefono=${celular}`)
    .then((data:any) => {
      console.log(data);
    })
    return p;
  }

  @authenticate.skip()  //No necesita autenticacion para el conteo
  @get('/personas/count')
  @response(200, {
    description: 'Persona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.count(where);
  }

  @get('/personas')
  @response(200, {
    description: 'Array of Persona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Persona) filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.personaRepository.find(filter);
  }

  @patch('/personas')
  @response(200, {
    description: 'Persona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.updateAll(persona, where);
  }

  @get('/personas/{id}')
  @response(200, {
    description: 'Persona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    return this.personaRepository.findById(id, filter);
  }

  @patch('/personas/{id}')
  @response(204, {
    description: 'Persona PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
  ): Promise<void> {
    await this.personaRepository.updateById(id, persona);
  }

  @put('/personas/{id}')
  @response(204, {
    description: 'Persona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() persona: Persona,
  ): Promise<void> {
    await this.personaRepository.replaceById(id, persona);
  }

  @del('/personas/{id}')
  @response(204, {
    description: 'Persona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personaRepository.deleteById(id);
  }
}
