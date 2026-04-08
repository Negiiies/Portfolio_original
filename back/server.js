const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;  // ← Port changé à 3001

// Middleware de sécurité
app.use(helmet());
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limite à 10 requêtes par fenêtre de temps par IP
  message: {
    error: 'Trop de requêtes envoyées depuis cette IP, veuillez réessayer plus tard.'
  }
});

// Configuration Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Route pour envoyer des emails de contact
app.post('/api/contact', limiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation basique
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Tous les champs sont requis'
      });
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Format d\'email invalide'
      });
    }

    // Vérifier si l'email est configuré
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('📧 Email non configuré - simulation d\'envoi');
      console.log(`De: ${name} (${email})`);
      console.log(`Sujet: ${subject}`);
      console.log(`Message: ${message}`);
      
      return res.status(200).json({
        success: true,
        message: 'Email simulé (configurez .env pour l\'envoi réel)'
      });
    }

    // Configuration de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #ffffff; background: #0a0a0a; padding: 20px;">
          <h2 style="color: #39ff14; border-bottom: 2px solid #39ff14; padding-bottom: 10px; text-align: center;">
            🚀 Nouveau message depuis votre portfolio
          </h2>
          
          <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #39ff14;">
            <h3 style="color: #00d4ff; margin-top: 0;">📋 Informations du contact</h3>
            <p><strong style="color: #39ff14;">👤 Nom:</strong> <span style="color: #ffffff;">${name}</span></p>
            <p><strong style="color: #39ff14;">📧 Email:</strong> <span style="color: #ffffff;">${email}</span></p>
            <p><strong style="color: #39ff14;">📝 Sujet:</strong> <span style="color: #ffffff;">${subject}</span></p>
          </div>
          
          <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #ff073a;">
            <h3 style="color: #ff073a; margin-top: 0;">💬 Message:</h3>
            <p style="color: #ffffff; line-height: 1.6; margin: 0;">${message}</p>
          </div>
        </div>
      `,
      replyTo: email
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Email envoyé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({
      error: 'Erreur serveur lors de l\'envoi de l\'email'
    });
  }
});

// Route pour récupérer des projets
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Cyberpunk',
      description: 'Plateforme de vente en ligne avec interface néon',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'completed',
      github: 'https://github.com/ton-username/ecommerce-project',
      demo: 'https://ton-demo.com'
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Tableau de bord temps réel avec graphiques interactifs',
      technologies: ['Next.js', 'TypeScript', 'D3.js', 'PostgreSQL'],
      status: 'in-progress',
      github: 'https://github.com/ton-username/dashboard-project',
      demo: 'https://ton-dashboard-demo.com'
    }
  ];
  
  res.json(projects);
});

// Route pour les compétences
app.get('/api/skills', (req, res) => {
  const skills = {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
    mobile: ['React Native', 'Flutter', 'Firebase'],
    devops: ['Docker', 'AWS', 'Git', 'Linux']
  };
  
  res.json(skills);
});

// Middleware pour gérer les routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    message: 'Cette route n\'existe pas sur l\'API'
  });
});

// Middleware global de gestion d'erreurs
app.use((error, req, res, next) => {
  console.error('Erreur serveur:', error);
  res.status(500).json({
    error: 'Erreur interne du serveur',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Une erreur est survenue'
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌐 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 Email configuré: ${process.env.EMAIL_USER ? '✅' : '❌ (mode simulation)'}`);
  console.log(`🔗 API accessible sur: http://localhost:${PORT}`);
  console.log(`🔗 Test de santé: http://localhost:${PORT}/api/health`);
});

module.exports = app;