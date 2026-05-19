<?php
/**
 * Contact Form Handler for Dr. Syed Waqas Website
 * Sends beautiful HTML contact emails to the administrator mailbox.
 */

// Enable error reporting for debugging during setup (disable in production if desired)
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Set header to JSON
header('Content-Type: application/json; charset=utf-8');

// Allow requests from the same domain
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// 1. CONFIGURATION
// Define the recipient email address (Your Hostinger Mailbox / Gmail)
define('RECIPIENT_EMAIL', 'tutor@drsyedmath.com');
// Secondary backup email (Optional, set to same or another mailbox)
define('SECONDARY_EMAIL', 'Syedwaqas8215@gmail.com'); 

// 2. CHECK REQUEST METHOD
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Only POST requests are accepted.'
    ]);
    exit;
}

// 3. RETRIEVE POST DATA (Supports both standard Form POST and JSON/AJAX POST)
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (json_last_error() === JSON_ERROR_NONE && is_array($input)) {
    // AJAX JSON Request
    $name = isset($input['name']) ? strip_tags(trim($input['name'])) : '';
    $email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL) : '';
    $phone = isset($input['phone']) ? strip_tags(trim($input['phone'])) : '';
    $course = isset($input['course']) ? strip_tags(trim($input['course'])) : '';
    $sat_score = isset($input['sat_score']) ? strip_tags(trim($input['sat_score'])) : '';
    $message = isset($input['message']) ? strip_tags(trim($input['message'])) : '';
    $form_source = isset($input['form_source']) ? strip_tags(trim($input['form_source'])) : 'Unknown Form';
} else {
    // Standard Form URL Encoded POST
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
    $course = isset($_POST['course']) ? strip_tags(trim($_POST['course'])) : '';
    $sat_score = isset($_POST['sat_score']) ? strip_tags(trim($_POST['sat_score'])) : '';
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';
    $form_source = isset($_POST['form_source']) ? strip_tags(trim($_POST['form_source'])) : 'Unknown Form';
}

// 4. VALIDATION
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all required fields (Name, Email, and Message).'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email address.'
    ]);
    exit;
}

// 5. PREPARE THE EMAIL HEADERS
// Set domain email for From header to avoid DMARC policy blocks
$host = $_SERVER['SERVER_NAME'];
if (substr($host, 0, 4) === 'www.') {
    $host = substr($host, 4);
}
// If localhost, use a fallback domain, otherwise use current domain
$from_domain = ($host === 'localhost' || $host === '127.0.0.1') ? 'drsyedmath.com' : $host;
$from_email = 'website@' . $from_domain;

// Create randomized boundary for email format robustness
$boundary = md5(uniqid(time()));

// Headers
$headers = "From: Dr. Syed Waqas Website <" . $from_email . ">\r\n";
$headers .= "Reply-To: " . $name . " <" . $email . ">\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Subject line
$subject = "New Contact Inquiry: " . $name . " [" . $form_source . "]";

// 6. BUILD PREMIUM HTML EMAIL BODY
$email_content = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Inquiry</title>
    <style>
        body {
            font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
        }
        .header {
            background: linear-gradient(135deg, #1e2978 0%, #344CC6 100%);
            padding: 30px 40px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: -0.02em;
        }
        .header p {
            margin: 5px 0 0 0;
            font-size: 14px;
            opacity: 0.85;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .content {
            padding: 40px;
        }
        .lead-text {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
            color: #475569;
        }
        .grid-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .grid-table td {
            padding: 12px 0;
            border-bottom: 1px solid #f1f5f9;
        }
        .grid-table td.label {
            font-weight: 600;
            color: #1e293b;
            width: 35%;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.02em;
        }
        .grid-table td.value {
            color: #475569;
            font-size: 15px;
        }
        .message-box {
            background-color: #f8fafc;
            border-left: 4px solid #344CC6;
            border-radius: 8px;
            padding: 20px;
            margin-top: 10px;
            font-size: 15px;
            line-height: 1.6;
            color: #334155;
            white-space: pre-wrap;
        }
        .message-title {
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            color: #1e293b;
            margin-bottom: 8px;
            letter-spacing: 0.02em;
        }
        .footer {
            background-color: #f1f5f9;
            padding: 20px 40px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
        }
        .footer a {
            color: #344CC6;
            text-decoration: none;
        }
        .badge {
            display: inline-block;
            padding: 4px 10px;
            background-color: #e0e7ff;
            color: #4338ca;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <p>Dr. Syed Waqas Website</p>
            <h1>New Inquiry Received</h1>
        </div>
        <div class="content">
            <p class="lead-text">You have received a new consultation request from your website contact form. Below are the details:</p>
            
            <table class="grid-table">
                <tr>
                    <td class="label">Full Name</td>
                    <td class="value"><strong>' . htmlspecialchars($name) . '</strong></td>
                </tr>
                <tr>
                    <td class="label">Email Address</td>
                    <td class="value"><a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></td>
                </tr>
                <tr>
                    <td class="label">Phone / WhatsApp</td>
                    <td class="value">' . (empty($phone) ? '<em>Not provided</em>' : htmlspecialchars($phone)) . '</td>
                </tr>
                <tr>
                    <td class="label">Course Interest</td>
                    <td class="value">' . (empty($course) ? '<em>Not specified</em>' : '<span class="badge">' . htmlspecialchars($course) . '</span>') . '</td>
                </tr>';

if (!empty($sat_score)) {
    $email_content .= '
                <tr>
                    <td class="label">Current SAT Score</td>
                    <td class="value"><strong>' . htmlspecialchars($sat_score) . '</strong></td>
                </tr>';
}

$email_content .= '
                <tr>
                    <td class="label">Submitted From</td>
                    <td class="value">' . htmlspecialchars($form_source) . '</td>
                </tr>
                <tr>
                    <td class="label">Date & Time</td>
                    <td class="value">' . date('Y-m-d H:i:s') . ' (Server Time)</td>
                </tr>
            </table>
            
            <div class="message-title">Message / Goals:</div>
            <div class="message-box">' . nl2br(htmlspecialchars($message)) . '</div>
        </div>
        <div class="footer">
            <p>This message was sent automatically from the contact form on <a href="http://' . htmlspecialchars($from_domain) . '">' . htmlspecialchars($from_domain) . '</a>.</p>
            <p>&copy; ' . date('Y') . ' Dr. Syed Waqas Math Tutoring. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
';

// 7. SEND EMAIL
$mail_sent = mail(RECIPIENT_EMAIL, $subject, $email_content, $headers);

// Also send to secondary email if configured and different
if (defined('SECONDARY_EMAIL') && SECONDARY_EMAIL !== RECIPIENT_EMAIL && !empty(SECONDARY_EMAIL)) {
    mail(SECONDARY_EMAIL, $subject, $email_content, $headers);
}

// 8. RESPONSE
if ($mail_sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.'
    ]);
} else {
    // If the standard php mail function failed, log it or give an error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, we encountered an error while trying to send your message. Please try again later or contact us directly at ' . RECIPIENT_EMAIL . '.'
    ]);
}
