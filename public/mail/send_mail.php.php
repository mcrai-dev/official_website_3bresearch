<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer et valider les données du formulaire
    $name = trim(htmlspecialchars($_POST['name'] ?? ''));
    $phone = trim(htmlspecialchars($_POST['phone'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $subject = trim(htmlspecialchars($_POST['subject'] ?? ''));
    $message = trim(htmlspecialchars($_POST['message'] ?? ''));
    $subscribe = isset($_POST['news']) ? "Yes" : "No";

    // Vérification des champs obligatoires
    if (empty($name) || empty($phone) || !$email || empty($subject) || empty($message)) {
        echo "Please fill in all required fields correctly.";
        exit;
    }

    // Configuration de l'email
    $to = "contact@3bresearch.fr";
    $mail_subject = "New Contact Form Submission: " . htmlspecialchars($subject);
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Contenu de l'email
    $mail_message = "You have received a new message from the contact form.\n\n";
    $mail_message .= "Name: $name\n";
    $mail_message .= "Phone: $phone\n";
    $mail_message .= "Email: $email\n";
    $mail_message .= "Subject: $subject\n";
    $mail_message .= "Message:\n$message\n";
    $mail_message .= "\nNewsletter Subscription: $subscribe\n";

    // Envoi de l'email
    if (mail($to, $mail_subject, $mail_message, $headers)) {
        echo "Thank you for contacting us. We will get back to you shortly.";
    } else {
        echo "Sorry, there was an issue sending your message. Please try again.";
    }
}
?>
