import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { TokenUserDto } from 'src/auth/dto/token.dto';
import { TokenUser } from 'src/auth/entities/token.entity';
import { User } from 'src/auth/entities/user.entity';
import { HandleErrorDbUtil } from 'src/common';

@Injectable()
export class EmailService {

    private transporter: Transporter

    constructor(private readonly configService: ConfigService){

        const emailHost = this.configService.get<string>('EMAIL_HOST')
        const emailPort = parseInt(this.configService.get<string>('EMAIL_PORT'), 10)
        const emailSecure= this.configService.get<string>('EMAIL_SECURE') === 'true'
        const emailUser =  this.configService.get<string>('EMAIL_USER')
        const emailPass =  this.configService.get<string>('EMAIL_PASS')
            
        this.transporter = nodemailer.createTransport({

            
            host: emailHost,
            port: emailPort,
            secure: emailSecure,
            auth: {
                user: emailUser,
                pass: emailPass
            },

            //tls:{rejectUnauthorized: false}
        })

    };



    async sendVerificationEmail(user: User, token:string ){

        const  emailOptions = {
            from:`${this.configService.get<string>('APP_NAME')} <${this.configService.get<string>('MAIL_FROM')}>`,
            to:user.email,
            subject:"Envío de código para verificación de Cuenta",
            html: `
                <div style="background-color: rgb(220, 229, 232);" >
                <h1 style="text-align: center; margin: 30px; color: #666;">Código de Verificación</h1>
                <h2 style="color: #666;">Hola ${user.username}</h2>
                <br>
                <p style="font-size: 16px; color: #666;">Gracias por registrarte en nuestra aplicación.</p>
                <p style="font-size: 18px; color: #666;">Tu código de verificación es:</p>
                <div style="margin: 30px;">

                        <button style="background-color: rgb(18, 146, 74); font-size: 20px; 
                            color: white;
                            border: solid seashell 2px;
                            border-radius: 10px;
                            width: 120px;
                            height: 50px;
                        ">
                            ${token}
                        </button>

                </div>
                <p style="font-size: 14px; color: #666;">Por favor, introduce este código en la
                    <a href="localhost:3007/api/auth/verification", target="_blank">
                        <span style="font-size: 18px; padding: 10px;" >TodoMax</span>
                    </a> 
                    para verificar tu cuenta. Este código expirará en 10 minutos.</p>
                <p style="font-size: 14px; color: #666;">Si no solicitaste esta verificación, puedes ignorar este correo.</p>
                <br>
                <p style="font-size: 15px; color: #666;">Saludos,</p>
                <p style="font-size: 15px; color: #666;">El equipo de TodoMax</p>
                </div>
            `,
        }  
        
        try {
            await this.transporter.sendMail(emailOptions)
        } catch (error) {
            console.log(error)
        }
    }
};
