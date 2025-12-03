import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    // Extraire les données du corps de la requête
    const body = await request.json();
    console.log('📨 Données reçues pour Blue Ocean Production:', body);

    const { 
      name = '', 
      email = '', 
      phone = '', 
      company = '',
      projectType = '', 
      message = '' 
    } = body;

    // Mapper les noms de champs (votre form vers l'ancien format)
    const nom = name;
    const telephone = phone;
    const projet = projectType;
    const entreprise = company;

    // Validation des données requises
    if (!nom || !email || !telephone || !projet || !message) {
      console.error('❌ Données manquantes:', { nom, email, telephone, projet, message });
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      );
    }

    // Configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Vérifier la connexion SMTP
    await transporter.verify();
    console.log('✅ Connexion SMTP établie');

    // Mapper les types de projet
    const projetTypes = {
      'corporate': 'Vidéo Corporate',
      'publicite': 'Publicité TV/Digital',
      'evenement': 'Couverture Événementielle',
      'formation': 'Vidéo Formation',
      'animation': 'Motion Design',
      'autre': 'Autre projet'
    };

    const projetLabel = projetTypes[projet] || projet;

    // Email pour l'administrateur
    const adminEmail = {
      from: `Blue Ocean Production <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'contact@blueocean.ma',
      replyTo: email,
      subject: `🎬 Nouvelle demande de projet - ${nom}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouvelle demande de projet</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2563EB 0%, #06B6D4 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
                .content { background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 20px; }
                .info-box { background: white; border-left: 4px solid #2563EB; padding: 15px; margin: 15px 0; border-radius: 0 8px 8px 0; }
                .client-message { background: #fff4e6; border: 1px solid #ffd8b2; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .action-box { background: #e3f2fd; border: 1px solid #90caf9; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
                .contact-info { background: #e8f5e9; border: 1px solid #a5d6a7; padding: 15px; border-radius: 8px; margin: 20px 0; }
                table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                td { padding: 10px; border-bottom: 1px solid #eee; }
                .label { font-weight: bold; color: #2563EB; min-width: 120px; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; color: #666; font-size: 12px; }
                .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
                .badge-blue { background: #2563EB; color: white; }
                .badge-green { background: #10B981; color: white; }
                .badge-purple { background: #8B5CF6; color: white; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1 style="margin: 0; font-size: 28px;">🎬 Nouvelle demande de projet</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Blue Ocean Studio - Agence Créative</p>
            </div>

            <div class="content">
                <h2 style="color: #2563EB; margin-top: 0;">Informations du client</h2>
                
                <div class="info-box">
                    <table>
                        <tr>
                            <td class="label">Nom complet :</td>
                            <td><strong>${nom}</strong></td>
                        </tr>
                        <tr>
                            <td class="label">Email :</td>
                            <td><a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email}</a></td>
                        </tr>
                        <tr>
                            <td class="label">Téléphone :</td>
                            <td><a href="tel:${telephone}" style="color: #2563EB; text-decoration: none;">${telephone}</a></td>
                        </tr>
                        ${entreprise ? `
                        <tr>
                            <td class="label">Entreprise :</td>
                            <td><strong>${entreprise}</strong></td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td class="label">Type de projet :</td>
                            <td><span class="badge badge-blue">${projetLabel}</span></td>
                        </tr>
                        <tr>
                            <td class="label">Date :</td>
                            <td>${new Date().toLocaleString('fr-FR', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</td>
                        </tr>
                        <tr>
                            <td class="label">Référence :</td>
                            <td><strong>BOS-${Date.now().toString().slice(-8)}</strong></td>
                        </tr>
                    </table>
                </div>

                <h3 style="color: #2563EB;">📝 Description du projet</h3>
                <div class="client-message">
                    <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
                    <p style="color: #666; font-size: 12px; margin-top: 10px; margin-bottom: 0;">
                        📊 Longueur du message: ${message.length} caractères
                    </p>
                </div>

                <div class="contact-info">
                    <h4 style="margin-top: 0; color: #2e7d32;">📞 Coordonnées du client</h4>
                    <p style="margin: 10px 0;">
                        <strong>Email :</strong> <a href="mailto:${email}" style="color: #2563EB;">${email}</a><br>
                        <strong>Téléphone :</strong> <a href="tel:${telephone}" style="color: #2563EB;">${telephone}</a>
                        ${entreprise ? `<br><strong>Entreprise :</strong> ${entreprise}` : ''}
                    </p>
                </div>

                <div class="action-box">
                    <h4 style="margin-top: 0; color: #2563EB;">⚡ Action requise</h4>
                    <p style="margin: 10px 0; font-weight: bold;">
                        Contacter le client sous 24 heures pour discuter du projet
                    </p>
                    <p style="margin: 5px 0;">
                        📞 Appeler : <strong>${telephone}</strong><br>
                        📧 Répondre à : <a href="mailto:${email}" style="color: #2563EB; font-weight: bold;">${email}</a>
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
                        💡 <strong>Priorité :</strong> <span class="badge badge-green">Haute</span> 
                        • Nouvelle demande de client potentiel
                    </p>
                </div>
            </div>

            <div class="footer">
                <p>
                    Cet email a été envoyé automatiquement depuis le formulaire de contact de<br>
                    <strong>Blue Ocean Studio</strong> - Agence Créative à Kénitra
                </p>
                <p style="color: #999; font-size: 11px;">
                    © ${new Date().getFullYear()} Blue Ocean Studio. Tous droits réservés.
                </p>
            </div>
        </body>
        </html>
      `,
    };

    // Email de confirmation pour le client
    const clientEmail = {
      from: `Blue Ocean Studio <${process.env.SMTP_USER}>`,
      to: email,
      subject: '🎬 Confirmation de votre demande - Blue Ocean Studio',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation de votre demande</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2563EB 0%, #06B6D4 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
                .content { background: white; padding: 25px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .confirmation-box { background: #f0f7ff; border-left: 4px solid #2563EB; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
                .project-summary { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
                .next-steps { background: #fff8e1; border: 1px solid #ffd54f; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .contact-section { background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; color: #666; font-size: 12px; }
                ul { margin: 10px 0; padding-left: 20px; }
                li { margin-bottom: 8px; }
                strong { color: #2563EB; }
                .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-left: 10px; }
                .badge-blue { background: #2563EB; color: white; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1 style="margin: 0; font-size: 28px;">Blue Ocean Studio</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">Agence Créative - Production Audiovisuelle</p>
            </div>

            <div class="content">
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="font-size: 48px; margin-bottom: 15px;">🎬</div>
                    <h2 style="color: #2563EB; margin: 0 0 10px 0;">Demande confirmée !</h2>
                    <p style="color: #666; margin: 0;">Merci ${nom}, nous avons bien reçu votre demande</p>
                </div>

                <div class="confirmation-box">
                    <p style="margin-top: 0;">
                        Bonjour <strong>${nom}</strong>,<br><br>
                        Nous vous confirmons la bonne réception de votre demande pour un projet de 
                        <strong>${projetLabel.toLowerCase()}</strong>. Notre équipe créative va étudier 
                        votre projet attentivement et vous contactera très prochainement pour discuter 
                        des détails et vous proposer une solution sur-mesure.
                    </p>
                </div>

                <div class="project-summary">
                    <h3 style="color: #2563EB; margin-top: 0;">📋 Récapitulatif de votre demande :</h3>
                    <ul>
                        <li><strong>Nom :</strong> ${nom}</li>
                        <li><strong>Email :</strong> ${email}</li>
                        <li><strong>Téléphone :</strong> ${telephone}</li>
                        ${entreprise ? `<li><strong>Entreprise :</strong> ${entreprise}</li>` : ''}
                        <li><strong>Type de projet :</strong> ${projetLabel} <span class="badge badge-blue">${projet}</span></li>
                        <li><strong>Date de la demande :</strong> ${new Date().toLocaleDateString('fr-FR')}</li>
                        <li><strong>Référence :</strong> BOS-${Date.now().toString().slice(-8)}</li>
                    </ul>
                </div>

                <div class="next-steps">
                    <h3 style="color: #F59E0B; margin-top: 0;">🔄 Prochaines étapes :</h3>
                    <ol style="margin: 15px 0; padding-left: 25px;">
                        <li><strong>Sous 24h :</strong> Appel de notre équipe pour comprendre vos besoins créatifs</li>
                        <li><strong>J+1 :</strong> Proposition créative et stratégique</li>
                        <li><strong>J+2 :</strong> Réception d'un devis détaillé et personnalisé</li>
                        <li><strong>J+3 :</strong> Planification de la production</li>
                        <li><strong>J+5 :</strong> Début de la phase créative</li>
                    </ol>
                    <p style="margin: 15px 0 0 0; font-size: 14px; color: #666;">
                        ⏱️ Temps de traitement estimé : 24-48h maximum
                    </p>
                </div>

                <div class="contact-section">
                    <h3 style="color: #10B981; margin-top: 0;">📞 Besoin d'une réponse rapide ?</h3>
                    <p style="margin: 10px 0;">
                        Vous pouvez nous contacter directement :<br>
                        <strong style="font-size: 18px;">📱 +212 600 000 000</strong><br>
                        <strong>📧 contact@blueocean.ma</strong>
                    </p>
                    <p style="margin: 15px 0 0 0; font-size: 14px;">
                        💬 <strong>WhatsApp :</strong> Disponible pour discuter de votre projet créatif
                    </p>
                </div>

                <div style="background: linear-gradient(135deg, #2563EB10 0%, #06B6D410 100%); padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                    <p style="margin: 0; color: #2563EB;">
                        <strong>📍 Notre studio :</strong> Kénitra, Maroc<br>
                        <span style="font-size: 14px;">Agence créative spécialisée en storytelling d'exception</span>
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">
                        Production Vidéo • Shooting Photo • Motion Design • Post-Production
                    </p>
                </div>
            </div>

            <div class="footer">
                <p>
                    <strong>Blue Ocean Studio</strong><br>
                    Agence Créative - Production Audiovisuelle Premium<br>
                    "Storytelling d'Exception"
                </p>
                <p style="color: #999; font-size: 11px; margin-top: 15px;">
                    Cet email a été envoyé automatiquement. Merci de ne pas y répondre.<br>
                    Pour toute question, contactez-nous via notre site web ou par téléphone.
                </p>
            </div>
        </body>
        </html>
      `,
    };

    // Envoi des emails
    console.log('📤 Envoi des emails pour Blue Ocean Studio...');
    
    await transporter.sendMail(adminEmail);
    console.log('✅ Email admin envoyé à:', process.env.ADMIN_EMAIL || 'contact@blueocean.ma');
    
    await transporter.sendMail(clientEmail);
    console.log('✅ Email de confirmation envoyé au client:', email);

    return NextResponse.json(
      { 
        success: true,
        message: 'Votre demande a été envoyée avec succès. Nous vous contacterons très prochainement.',
        data: {
          nom,
          email,
          telephone,
          entreprise,
          projet: projetLabel,
          date: new Date().toISOString(),
          reference: `BOS-${Date.now().toString().slice(-8)}`
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi des emails:', error);
    console.error('📝 Stack:', error.stack);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Une erreur est survenue lors de l\'envoi de votre demande',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}