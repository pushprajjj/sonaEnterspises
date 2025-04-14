<?php
// Set response type to JSON
header('Content-Type: application/json');

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize input
    $name    = trim($_POST['name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $number  = trim($_POST['phone'] ?? ''); // Changed to match "phone" from frontend
    $message = trim($_POST['message'] ?? '');

    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
        exit;
    }

    // Prepare email
    $to      = "pushprajkumar7874@gmail.com";
    $subject = "Contact Form Submission";
    $body    = "Name: $name\nEmail: $email\nPhone: $number\nMessage: $message";
    $headers = "From: $name <$email>";

    // Send the email
    $sent = mail($to, $subject, $body, $headers);

    if ($sent) {
        echo json_encode(['success' => true, 'message' => 'Thank you for your message!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'There was an error sending your message. Please try again later.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
