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
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Veterinario} from '../models';
import {VeterinarioRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');

export class VeterinarioController {
  constructor(
    @repository(VeterinarioRepository)
    public veterinarioRepository : VeterinarioRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}

  @post('/veterinarios')
  @response(200, {
    description: 'Veterinario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Veterinario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {
            title: 'NewVeterinario',
            exclude: ['id'],
          }),
        },
      },
    })
    veterinario: Omit<Veterinario, 'id'>,
  ): Promise<Veterinario> {
    // Vamos a modificar el retorno de esta funcion de creacion veterinario par que envie
    // un correo de confirmacion al usuario
    const clave = this.servicioAutenticacion.GenerarClave();
    const claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    veterinario.clave = claveCifrada;
    //Await para que espere un proceso anterior
    const v = await this.veterinarioRepository.create(veterinario);

    //Ahora a notificar al usuario via correo electronico
    const email = veterinario.correo;
    const asunto = "PetFriend -- Registro de Veterinario Completado!";
    const mensaje = `Hola ${veterinario.nombres}, su nombre de usuario es: ${veterinario.correo} y su contraseña es: ${clave}, perfil Veterinario.`;
    fetch(`${Llaves.urlServicioNotificaciones}/mail?email=${email}&asunto=${asunto}&mensaje=${mensaje}`)
    .then((data:any) => {
      console.log(data);
    })
    //Envío de confirmacion por sms
    const celular = veterinario.celular;
    fetch(`${Llaves.urlServicioNotificaciones}/sms?mensaje=${mensaje}&telefono=${celular}`)
    .then((data:any) => {
      console.log(data);
    })
    return v;
  }

  @get('/veterinarios/count')
  @response(200, {
    description: 'Veterinario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Veterinario) where?: Where<Veterinario>,
  ): Promise<Count> {
    return this.veterinarioRepository.count(where);
  }

  @get('/veterinarios')
  @response(200, {
    description: 'Array of Veterinario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Veterinario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Veterinario) filter?: Filter<Veterinario>,
  ): Promise<Veterinario[]> {
    return this.veterinarioRepository.find(filter);
  }

  @patch('/veterinarios')
  @response(200, {
    description: 'Veterinario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {partial: true}),
        },
      },
    })
    veterinario: Veterinario,
    @param.where(Veterinario) where?: Where<Veterinario>,
  ): Promise<Count> {
    return this.veterinarioRepository.updateAll(veterinario, where);
  }

  @get('/veterinarios/{id}')
  @response(200, {
    description: 'Veterinario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Veterinario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Veterinario, {exclude: 'where'}) filter?: FilterExcludingWhere<Veterinario>
  ): Promise<Veterinario> {
    return this.veterinarioRepository.findById(id, filter);
  }

  @patch('/veterinarios/{id}')
  @response(204, {
    description: 'Veterinario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {partial: true}),
        },
      },
    })
    veterinario: Veterinario,
  ): Promise<void> {
    await this.veterinarioRepository.updateById(id, veterinario);
  }

  @put('/veterinarios/{id}')
  @response(204, {
    description: 'Veterinario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() veterinario: Veterinario,
  ): Promise<void> {
    await this.veterinarioRepository.replaceById(id, veterinario);
  }

  @del('/veterinarios/{id}')
  @response(204, {
    description: 'Veterinario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.veterinarioRepository.deleteById(id);
  }
}
