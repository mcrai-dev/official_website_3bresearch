const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware pour analyser le corps des requêtes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route par défaut pour servir l'index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Simuler une base de données pour la newsletter (remplacer par une vraie DB)
let newsletterSubscribers = [];

// Gestion des inscriptions à la newsletter
app.post('/newsletter', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send("Email manquant.");
    }

    if (newsletterSubscribers.includes(email)) {
        return res.status(400).send("Vous êtes déjà inscrit à la newsletter.");
    }

    newsletterSubscribers.push(email);
    res.send("Merci pour votre inscription à notre newsletter !");
});

// Route pour envoyer une newsletter (accessible via POST)
app.post('/send-newsletter', async (req, res) => {
    const { subject, message } = req.body;

    if (!subject || !message) {
        return res.status(400).send("Sujet ou contenu manquant.");
    }

    try {
        // Configurer le transporteur d'e-mails
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'votre-email@gmail.com', // Remplacez par votre email
                pass: 'votre-mot-de-passe',    // Remplacez par un mot de passe d'application sécurisé
            },
        });

        // Envoyer à tous les abonnés
        for (const email of newsletterSubscribers) {
            await transporter.sendMail({
                from: '"Votre Site" <votre-email@gmail.com>',
                to: email,
                subject: subject,
                text: message,
            });
        }

        res.send("Newsletter envoyée avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'envoi de la newsletter :", error);
        res.status(500).send("Erreur lors de l'envoi de la newsletter.");
    }
});

// Route pour afficher les données de suivi des utilisateurs
let userTrackingData = {};

app.get("/admin/tracking-data", (req, res) => {
    res.json(userTrackingData); // Retourne les données collectées en JSON
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
