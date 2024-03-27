// Kullanıcının konum izni istenir
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(activateQRLink, handleLocationError);
} else {
    console.log("Konum servisi desteklenmiyor.");
}

// Konum alındıktan sonra QR kod bağlantısını aktive eden fonksiyon
function activateQRLink(position) {
    // Örnek olarak, belirli bir koordinat (latitude ve longitude) tanımlanır
    var targetLatitude = 41.02154705395299; // Örnek bir enlem değeri
    var targetLongitude = 29.020239003354593; // Örnek bir boylam değeri

    // Kullanıcının konumu alınır
    var userLatitude = position.coords.latitude;
    var userLongitude = position.coords.longitude;

    // Hesaplanan konum ile hedef konum arasındaki uzaklık hesaplanır (örneğin, mesafe hesaplama algoritmaları kullanılabilir)
    var distance = calculateDistance(userLatitude, userLongitude, targetLatitude, targetLongitude);

    // Belirli bir eşik değeriyle kontrol edilir ve eğer hedef konuma yakınsa QR kod bağlantısı aktive edilir
    var threshold = 0.1; // Örnek bir eşik değeri (bu değer metrekare cinsindendir ve uygulamaya göre değiştirilebilir)
    if (distance <= threshold) {
        // QR kod bağlantısı burada aktive edilir
        var qrLink = "https://kubaicode.com/contact.html"; // Örnek bir QR kod bağlantısı
        window.location.href = qrLink; // Tarayıcıyı QR kod bağlantısına yönlendir
    } else {
        console.log("Hedef konuma yakın değilsiniz.");
    }
}

// Konum erişiminde hata oluştuğunda çağrılacak olan fonksiyon
function handleLocationError(error) {
    console.error("Konum alınamadı: ", error);
}

// İki nokta arasındaki mesafeyi hesaplayan fonksiyon (örneğin, Haversine formülü kullanılabilir)
function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Dünya'nın yarıçapı (km)
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c; // Mesafe km cinsindendir
    return distance;
}

// Dereceyi radyana dönüştüren yardımcı fonksiyon
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
