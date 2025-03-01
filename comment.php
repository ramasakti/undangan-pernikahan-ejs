<?php
include 'koneksi.php';
include 'cors.php';

// Memastikan header CORS dikirim sebelum output lain
header("Content-Type: application/json");

// Membaca dan meng-decode input JSON dari request body
$input = json_decode(file_get_contents('php://input'), true);

// Mendapatkan nilai dari input JSON
$name = $input['name'];
$commentary = $input['commentary'];

// Menggunakan prepared statement untuk keamanan
$stmt = $koneksi->prepare("INSERT INTO comment (name, commentary) VALUES (?, ?)");
$stmt->bind_param("ss", $name, $commentary);

if ($stmt->execute()) {
    $response = [
        "status" => "success",
        "message" => "Data berhasil dimasukkan",
        "data" => [$name, $commentary]
    ];
} else {
    $response = [
        "status" => "error",
        "message" => "Gagal memasukkan data: " . $stmt->error
    ];
}

$stmt->close();
$koneksi->close();

echo json_encode($response, JSON_PRETTY_PRINT);
?>
