import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { HttpErrors, Request } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from "parse-bearer-token";
import { AutenticacionService } from "../services";

export class EstrategiaAdministrador implements AuthenticationStrategy{
    name: string = 'admin';

constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
){

}
    //Metodo authenticate que recibe un token y crea un perfil de usuario autorizado admin
    async authenticate(request: Request): Promise<UserProfile | undefined> {
        let token = parseBearerToken(request);
        if(token){
            let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
            if(datos){
                let perfil: UserProfile = Object.assign({
                    nombre: datos.data.nombre
                });
                return perfil;
            }else{
                throw new HttpErrors[401]('El token incluido no es válido.');
            }
        }else{
            throw new HttpErrors[401]('No se ha proporcionado un token');
        }
    }
}