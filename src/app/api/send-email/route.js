// src/app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';

// Helper function to convert image to base64
const getImageAsBase64 = (filename) => {
  try {
    const filePath = join(process.cwd(), 'public', filename);
    const imageBuffer = readFileSync(filePath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = getMimeType(filename);
    return `data:${mimeType};base64,${base64Image}`;
  } catch (error) {
    console.error(`Error reading image ${filename}:`, error);
    return null;
  }
};

const getMimeType = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  const mimeTypes = {
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'webp': 'image/webp'
  };
  return mimeTypes[extension] || 'image/png';
};

export async function POST(request) {
  try {
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

    // Validation des données requises
    if (!name || !email || !phone || !projectType || !message) {
      console.error('❌ Données manquantes:', { name, email, phone, projectType, message });
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

    // Convert logo to base64
    const logoBase64 = getImageAsBase64('logo-blue-ocean.png') || getImageAsBase64('logo.png') || getImageAsBase64('logo bo-01.png');

    // Mapper les types de projet
    const projetTypes = {
      'corporate': 'Vidéo Corporate',
      'publicite': 'Publicité TV/Digital',
      'evenement': 'Couverture Événementielle',
      'formation': 'Vidéo Formation',
      'animation': 'Motion Design',
      'autre': 'Autre projet'
    };

    const projetLabel = projetTypes[projectType] || projectType;
    const reference = `BOS-${Date.now().toString().slice(-6)}`;
    const today = new Date();
    const deadline = new Date(today);
    deadline.setHours(deadline.getHours() + 24);

    // Email pour l'administrateur (Fixed images)
    const adminEmail = {
      from: `"Blue Ocean Studio" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'contact@blueocean.ma',
      replyTo: email,
      subject: `🎬 NOUVEAU PROJET #${reference} - ${name} - ${projetLabel}`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouveau Projet - Blue Ocean Studio</title>
            <style>
                /* Modern Reset */
                * { margin: 0; padding: 0; box-sizing: border-box; }
                
                body {
                    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #2d3748;
                    background: #f6f9fc;
                    padding: 20px;
                    min-height: 100vh;
                }
                
                .email-wrapper {
                    max-width: 700px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
                }
                
                /* Header */
                .header {
                    background: linear-gradient(135deg, #0c4a6e 0%, #0891b2 50%, #06b6d4 100%);
                    padding: 40px 30px;
                    text-align: center;
                }
                
                .logo-container {
                    margin-bottom: 25px;
                }
                
                .logo {
                    height: 70px;
                    max-width: 200px;
                    object-fit: contain;
                }
                
                .header-title {
                    color: white;
                    font-size: 32px;
                    font-weight: 700;
                    margin: 0 0 10px;
                }
                
                .header-subtitle {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 16px;
                    margin: 0 0 20px;
                }
                
                .project-badge {
                    display: inline-block;
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    padding: 10px 25px;
                    border-radius: 50px;
                    font-weight: 600;
                    font-size: 16px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                
                /* Content */
                .content {
                    padding: 40px 30px;
                }
                
                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                    margin-bottom: 30px;
                }
                
                .stat-card {
                    background: #f8fafc;
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                    border: 1px solid #e2e8f0;
                }
                
                .stat-icon {
                    font-size: 24px;
                    margin-bottom: 10px;
                    display: block;
                }
                
                .stat-value {
                    font-size: 22px;
                    font-weight: 700;
                    color: #0c4a6e;
                    margin-bottom: 5px;
                }
                
                .stat-label {
                    color: #64748b;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                /* Section Title */
                .section-title {
                    color: #0c4a6e;
                    font-size: 20px;
                    font-weight: 600;
                    margin: 30px 0 20px;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #e2e8f0;
                }
                
                /* Info Grid */
                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                    margin-bottom: 25px;
                }
                
                .info-item {
                    background: #f8fafc;
                    border-radius: 12px;
                    padding: 20px;
                    border-left: 4px solid #0ea5e9;
                }
                
                .info-label {
                    color: #64748b;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .info-value {
                    color: #1e293b;
                    font-size: 16px;
                    font-weight: 500;
                }
                
                /* Message Box */
                .message-box {
                    background: #fff7ed;
                    border: 1px solid #fdba74;
                    border-radius: 12px;
                    padding: 25px;
                    margin: 25px 0;
                }
                
                .message-content {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    white-space: pre-wrap;
                    line-height: 1.6;
                    font-size: 15px;
                    color: #334155;
                }
                
                /* Urgent Action */
                .urgent-card {
                    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
                    border: 2px solid #ef4444;
                    border-radius: 16px;
                    padding: 30px;
                    margin: 30px 0;
                    text-align: center;
                }
                
                .urgent-title {
                    color: #dc2626;
                    font-size: 22px;
                    font-weight: 700;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }
                
                .urgent-badge {
                    background: #ef4444;
                    color: white;
                    padding: 6px 16px;
                    border-radius: 50px;
                    font-size: 12px;
                    font-weight: 700;
                }
                
                /* Contact Buttons */
                .contact-buttons {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    margin: 25px 0;
                    flex-wrap: wrap;
                }
                
                .contact-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 24px;
                    border-radius: 10px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.3s ease;
                }
                
                .btn-email {
                    background: #3b82f6;
                    color: white;
                }
                
                .btn-phone {
                    background: #10b981;
                    color: white;
                }
                
                .btn-whatsapp {
                    background: #22c55e;
                    color: white;
                }
                
                .contact-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                }
                
                /* Footer */
                .footer {
                    background: #1e293b;
                    color: white;
                    padding: 30px;
                    text-align: center;
                }
                
                .footer-logo {
                    height: 40px;
                    opacity: 0.9;
                    margin-bottom: 20px;
                }
                
                .footer-text {
                    color: #cbd5e1;
                    font-size: 13px;
                    line-height: 1.6;
                }
                
                /* Responsive */
                @media (max-width: 640px) {
                    .header, .content { padding: 25px 20px; }
                    .stats-grid { grid-template-columns: 1fr; }
                    .info-grid { grid-template-columns: 1fr; }
                    .contact-buttons { flex-direction: column; }
                    .urgent-card { padding: 20px; }
                }
            </style>
        </head>
        <body>
            <div class="email-wrapper">
                <!-- Header -->
                <div class="header">
                    <div class="logo-container">
                        ${logoBase64 ? `<img src="${logoBase64}" alt="Blue Ocean Studio" class="logo">` : '<div style="color: white; font-size: 28px; font-weight: bold;">Blue Ocean Studio</div>'}
                    </div>
                    <h1 class="header-title">Nouveau Projet Reçu</h1>
                    <p class="header-subtitle">Agence Créative & Production Audiovisuelle</p>
                    <div class="project-badge">
                        ${projetLabel}
                    </div>
                </div>

                <!-- Content -->
                <div class="content">
                    <!-- Stats -->
                    <div class="stats-grid">
                        <div class="stat-card">
                            <span class="stat-icon">🎯</span>
                            <div class="stat-value">#${reference}</div>
                            <div class="stat-label">Référence</div>
                        </div>
                        <div class="stat-card">
                            <span class="stat-icon">⏱️</span>
                            <div class="stat-value">24h</div>
                            <div class="stat-label">Délai de réponse</div>
                        </div>
                        <div class="stat-card">
                            <span class="stat-icon">📊</span>
                            <div class="stat-value">${projectType.slice(0, 3).toUpperCase()}</div>
                            <div class="stat-label">Type</div>
                        </div>
                    </div>

                    <!-- Client Info -->
                    <h2 class="section-title">👤 Informations Client</h2>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">
                                👤 Nom Complet
                            </div>
                            <div class="info-value">${name}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                🏢 Entreprise
                            </div>
                            <div class="info-value">${company || 'Non spécifiée'}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                📧 Email
                            </div>
                            <div class="info-value">
                                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                📱 Téléphone
                            </div>
                            <div class="info-value">
                                <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">${phone}</a>
                            </div>
                        </div>
                    </div>

                    <!-- Project Details -->
                    <h2 class="section-title">📋 Détails du Projet</h2>
                    <div class="info-grid">
                        <div class="info-item" style="border-left-color: #8b5cf6;">
                            <div class="info-label">
                                🎬 Type de Projet
                            </div>
                            <div class="info-value" style="color: #8b5cf6; font-weight: 600;">${projetLabel}</div>
                        </div>
                        <div class="info-item" style="border-left-color: #f59e0b;">
                            <div class="info-label">
                                📅 Date de Soumission
                            </div>
                            <div class="info-value">
                                ${today.toLocaleDateString('fr-FR', { 
                                    weekday: 'short',
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric'
                                })}
                                <br>
                                <small>${today.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</small>
                            </div>
                        </div>
                    </div>

                    <!-- Client Message -->
                    <h2 class="section-title">💬 Message du Client</h2>
                    <div class="message-box">
                        <div class="message-content">
                            ${message}
                            <div style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed #fdba74; color: #9ca3af; font-size: 13px;">
                                📝 ${message.length} caractères • ${message.split(' ').length} mots
                            </div>
                        </div>
                    </div>

                    <!-- Urgent Action -->
                    <div class="urgent-card">
                        <div class="urgent-title">
                            ⚡ ACTION REQUISE
                            <span class="urgent-badge">HAUTE PRIORITÉ</span>
                        </div>
                        <p style="color: #7f1d1d; font-size: 16px; margin-bottom: 20px; font-weight: 600;">
                            Contacter le client avant le ${deadline.toLocaleDateString('fr-FR')} à ${deadline.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        
                        <div class="contact-buttons">
                            <a href="mailto:${email}" class="contact-btn btn-email">
                                📧 Répondre par Email
                            </a>
                            <a href="tel:${phone}" class="contact-btn btn-phone">
                                📞 Appeler le Client
                            </a>
                            <a href="https://wa.me/${phone.replace(/\D/g, '')}" class="contact-btn btn-whatsapp">
                                💬 WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                    ${logoBase64 ? `<img src="${logoBase64}" alt="Blue Ocean Studio" class="footer-logo">` : '<div style="color: white; font-size: 20px; font-weight: bold; margin-bottom: 20px;">Blue Ocean Studio</div>'}
                    <p class="footer-text">
                        Système de gestion des projets • Blue Ocean Studio
                    </p>
                    <p class="footer-text" style="margin-top: 15px; color: #94a3b8;">
                        📧 contact@blueocean.ma • 📱 +212 600 000 000
                    </p>
                    <p class="footer-text" style="margin-top: 20px; font-size: 12px; color: #64748b;">
                        © ${today.getFullYear()} Blue Ocean Studio. Tous droits réservés.
                    </p>
                </div>
            </div>
        </body>
        </html>
      `,
      text: `NOUVEAU PROJET - BLUE OCEAN STUDIO
=============================
Référence: #${reference}
Date: ${today.toLocaleDateString('fr-FR')}
Heure: ${today.toLocaleTimeString('fr-FR')}

CLIENT:
• Nom: ${name}
• Entreprise: ${company || 'Non spécifiée'}
• Email: ${email}
• Téléphone: ${phone}

PROJET:
• Type: ${projetLabel}
• Statut: En attente de contact
• Priorité: Haute

MESSAGE DU CLIENT:
${message}

ACTION REQUISE:
Contacter le client sous 24h
Dernier délai: ${deadline.toLocaleDateString('fr-FR')} à ${deadline.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}

CONTACT RAPIDE:
• Email: ${email}
• Téléphone: ${phone}
• WhatsApp: https://wa.me/${phone.replace(/\D/g, '')}

Blue Ocean Studio
contact@blueocean.ma | +212 600 000 000`
    };

    // Email de confirmation pour le client (simplified without images)
    const clientEmail = {
      from: `"Blue Ocean Studio" <${process.env.SMTP_USER}>`,
      to: email,
      cc: process.env.ADMIN_EMAIL || 'contact@blueocean.ma',
      subject: `🎬 Confirmation de votre projet #${reference} - Blue Ocean Studio`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation Projet</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background: linear-gradient(135deg, #0c4a6e 0%, #0891b2 100%);
                    color: white;
                    padding: 40px 30px;
                    border-radius: 15px 15px 0 0;
                    text-align: center;
                }
                .content {
                    background: white;
                    padding: 30px;
                    border-radius: 0 0 15px 15px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                }
                .confirmation-icon {
                    background: #10b981;
                    color: white;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 28px;
                    margin: 0 auto 20px;
                }
                .project-card {
                    background: #f8fafc;
                    border-radius: 12px;
                    padding: 25px;
                    margin: 25px 0;
                    border: 1px solid #e2e8f0;
                }
                .timeline {
                    position: relative;
                    padding-left: 25px;
                }
                .timeline:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: #0ea5e9;
                }
                .timeline-item {
                    position: relative;
                    margin-bottom: 25px;
                    padding-left: 20px;
                }
                .timeline-item:before {
                    content: '';
                    position: absolute;
                    left: -6px;
                    top: 5px;
                    width: 12px;
                    height: 12px;
                    background: #0ea5e9;
                    border-radius: 50%;
                    border: 3px solid white;
                }
                .contact-section {
                    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
                    border-radius: 12px;
                    padding: 25px;
                    text-align: center;
                    margin: 25px 0;
                }
                .footer {
                    background: #1e293b;
                    color: white;
                    padding: 25px;
                    border-radius: 12px;
                    margin-top: 30px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="confirmation-icon">
                    ✓
                </div>
                <h1 style="margin: 0 0 10px; font-size: 28px;">Demande Confirmée !</h1>
                <p style="margin: 0; opacity: 0.9; font-size: 16px;">
                    Votre projet créatif est entre de bonnes mains
                </p>
            </div>

            <div class="content">
                <!-- Greeting -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #0c4a6e; margin: 0 0 15px;">Cher(e) ${name},</h2>
                    <p style="color: #475569;">
                        Nous vous remercions pour votre confiance. Votre demande de projet 
                        <strong>${projetLabel.toLowerCase()}</strong> a bien été enregistrée.
                    </p>
                </div>

                <!-- Project Summary -->
                <div class="project-card">
                    <h3 style="color: #0c4a6e; margin: 0 0 20px;">📋 Récapitulatif</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                        <div>
                            <div style="color: #64748b; font-size: 13px;">Référence</div>
                            <div style="color: #0ea5e9; font-weight: 600; font-size: 16px;">#${reference}</div>
                        </div>
                        <div>
                            <div style="color: #64748b; font-size: 13px;">Type de projet</div>
                            <div style="color: #8b5cf6; font-weight: 600; font-size: 16px;">${projetLabel}</div>
                        </div>
                        <div>
                            <div style="color: #64748b; font-size: 13px;">Date</div>
                            <div style="color: #10b981; font-weight: 600; font-size: 16px;">
                                ${today.toLocaleDateString('fr-FR')}
                            </div>
                        </div>
                        <div>
                            <div style="color: #64748b; font-size: 13px;">Statut</div>
                            <div style="background: #fef3c7; color: #92400e; padding: 5px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block;">
                                ⏳ En analyse
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Next Steps -->
                <h3 style="color: #0c4a6e; margin: 30px 0 20px;">🔄 Prochaines étapes</h3>
                <div class="timeline">
                    <div class="timeline-item">
                        <div style="color: #0ea5e9; font-weight: 600; font-size: 15px;">J+1 • Premier contact</div>
                        <p style="color: #475569; margin: 5px 0 0;">Appel de notre chef de projet</p>
                    </div>
                    <div class="timeline-item">
                        <div style="color: #0ea5e9; font-weight: 600; font-size: 15px;">J+2 • Proposition créative</div>
                        <p style="color: #475569; margin: 5px 0 0;">Proposition stratégique personnalisée</p>
                    </div>
                    <div class="timeline-item">
                        <div style="color: #0ea5e9; font-weight: 600; font-size: 15px;">J+3 • Devis détaillé</div>
                        <p style="color: #475569; margin: 5px 0 0;">Devis transparent avec planning</p>
                    </div>
                </div>

                <!-- Contact Section -->
                <div class="contact-section">
                    <h3 style="color: #166534; margin: 0 0 15px;">📞 Besoin d'une réponse rapide ?</h3>
                    <p style="color: #166534; margin-bottom: 20px;">
                        Notre équipe est disponible pour discuter de votre projet
                    </p>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:+212600000000" style="background: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; color: #166534; font-weight: 600;">
                            📱 +212 600 000 000
                        </a>
                        <a href="mailto:contact@blueocean.ma" style="background: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; color: #166534; font-weight: 600;">
                            📧 contact@blueocean.ma
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer">
                <p style="margin: 0 0 15px; color: #cbd5e1;">
                    Merci de votre confiance. Nous sommes impatients de donner vie à votre projet créatif.
                </p>
                <p style="margin: 0; font-size: 14px; color: #94a3b8;">
                    <strong>Blue Ocean Studio</strong><br>
                    Agence Créative & Production Audiovisuelle
                </p>
                <p style="margin: 15px 0 0; font-size: 12px; color: #64748b;">
                    Cet email a été envoyé automatiquement.<br>
                    © ${today.getFullYear()} Blue Ocean Studio
                </p>
            </div>
        </body>
        </html>
      `,
      text: `CHER(E) ${name.toUpperCase()},

VOTRE DEMANDE DE PROJET EST CONFIRMÉE

📋 RÉCAPITULATIF:
• Référence: #${reference}
• Type: ${projetLabel}
• Date: ${today.toLocaleDateString('fr-FR')}
• Statut: En analyse créative

🔄 PROCHAINES ÉTAPES:
1. J+1: Premier contact téléphonique
2. J+2: Proposition créative personnalisée
3. J+3: Devis détaillé et planning

📞 CONTACT RAPIDE:
• Téléphone: +212 600 000 000
• Email: contact@blueocean.ma
• WhatsApp: +212 600 000 000

Merci de votre confiance.
L'équipe Blue Ocean Studio`
    };

    // Envoi des emails
    console.log('📤 Envoi des emails...');
    
    await transporter.sendMail(adminEmail);
    console.log('✅ Email admin envoyé');
    
    await transporter.sendMail(clientEmail);
    console.log('✅ Email client envoyé');

    return NextResponse.json(
      { 
        success: true,
        message: 'Votre demande a été envoyée avec succès. Nous vous contacterons très prochainement.',
        data: {
          name,
          email,
          phone,
          company,
          projectType: projetLabel,
          date: today.toISOString(),
          reference: reference
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Erreur:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Une erreur est survenue lors de l\'envoi de votre demande'
      },
      { status: 500 }
    );
  }
}