import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Persona, Veterinario} from '../models';
import {PersonaRepository, VeterinarioRepository} from '../repositories';
const generador = require('password-generator');
const crytoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    //Intancia del repositorio Persona
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
    @repository(VeterinarioRepository)
    public veterinarioRepository: VeterinarioRepository,
    ) {}

  /*
   * Add service methods here
   */

  //Generador de contraseña aleatoria con password generator
  GenerarClave(){
    const clave = generador(8,false);
    return clave;
  }

  //Cifrado de clave con crypto-js para guardar hash en BD
  CifrarClave(clave:string){
    const claveCifrada = crytoJS.MD5(clave).toString();
    return claveCifrada;
  }

  //Para identificar una persona por su usuario y clave
  IdentificarPersona(usuario:string, clave:string){
    try{
      const p = this.personaRepository.findOne({
        where:{
          correo: usuario,
          clave: clave
        }
      });
      if(p){
        return p;
      }
      return false;
    }catch{
      return false;
    }
  }

  //Para identificar un veterinario por su usuario y clave
  IdentificarVeterinario(usuario:string, clave:string){
    try{
      const v = this.veterinarioRepository.findOne({
        where:{
          correo: usuario,
          clave: clave
        }
      });
      if(v){
        return v;
      }
      return false;
    }catch{
      return false;
    }
  }

  //Generar un token para una persona autenticada
  GenerarTokenJWT(persona: Persona){
    const token = jwt.sign({
      data:{
        id: persona.id,
        correo: persona.correo,
        nombre: persona.nombres + " " + persona.apellidos
      }
    },
      Llaves.claveJWT);
    return token;
  }

  //Generar un token para un veterinario autenticado
  GenerarTokenJWTV(veterinario: Veterinario){
    const token = jwt.sign({
      data:{
        id: veterinario.id,
        correo: veterinario.correo,
        nombre: veterinario.nombres + " " + veterinario.apellidos
      }
    },
      Llaves.claveJWT);
    return token;
  }

  //Validar un token contra la llave de seguridad
  ValidarTokenJWT(token:string){
    try{
      const resultado = jwt.verify(token, Llaves.claveJWT);
      return resultado;
    }catch{
      return false;
    }
  }



}
