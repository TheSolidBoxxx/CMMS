import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config();

const transporter = nodemailer.createTransport({
    port: 465,
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_PASS,
    },
    secure: true,
});

function sendEmail(recv_email, params){
    const mailOptions = {
        from: process.env.SENDER_MAIL,
        to: recv_email,
        subject: `Nueva orden de mantenimiento asignada, #${params.no_req}`,
        text: `Responsable: ${params.no_responsable} | ${params.apellido}\n\n
        Denominación: ${params.denominacion}\n
        Tipo de mantenimiento: ${params.grado == 1 ? 'Correctivo' : params.grado == 2 ? 'Preventivo' : "Predictivo"}\n
        Descripción: ${params.descripcion}\n
        Prioridad: ${params.prioridad} (${params.prioridad == 1 ? 'BAJA' : params.prioridad == 2 ? 'MEDIA' : 'ALTA'})\n
        Tipo de tarea: ${params.tipo}\n
        Fecha planificada: ${params.fecha_plan}`

        // attachments: [
        //     {
        //         filename: 'text notes.txt',
        //         path: 'notes.txt'
        //     },
        //  ]
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
    });
}

export default sendEmail;

