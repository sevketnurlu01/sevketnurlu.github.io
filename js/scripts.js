//40.99669573536972,29.019627519704144
// Kullanıcının konum izni istenir
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(activateQRLink, handleLocationError);
} else {
    console.log("Konum servisi desteklenmiyor.");
}

// Konum alındıktan sonra QR kod bağlantısını aktive eden fonksiyon
function activateQRLink(position) {
    // Örnek olarak, hedef konumun koordinatları tanımlanır
    var targetLatitude = 40.9966; // Hedef konumun enlem değeri
    var targetLongitude = 29.0196; // Hedef konumun boylam değeri

    // Kullanıcının konumu alınır
    var userLatitude = position.coords.latitude;
    var userLongitude = position.coords.longitude;

    // Hedef konum ile kullanıcının konumu arasındaki mesafe hesaplanır
    var distance = calculateDistance(userLatitude, userLongitude, targetLatitude, targetLongitude);

    // Eğer kullanıcı hedef konumun 20 metre çapı içinde değilse belirli bir bağlantıya erişim engellenir
    var threshold = 0.02; // 20 metrelik eşik değer (bu değer uygulamaya göre değiştirilebilir)
    if (distance > threshold) {
        // Kullanıcı hedef konumun 20 metre çapı içinde değil, bu yüzden belirli bir bağlantıya erişim engellenir
        console.log("Hedef konumun 20 metre çapı içinde değilsiniz. Erişim engellendi.");
        // Engellenen bağlantıya yönlendirme veya başka bir işlem burada yapılabilir.
        window.location.href = "https://www.kubaicode.com/"; // Örnek olarak engellenen bağlantıya yönlendirme
    } else {
        // Kullanıcı hedef konumun 20 metre çapı içinde olduğu için QR kod bağlantısı aktive edilir
        console.log("Hedef konumun 20 metre çapı içindesiniz. QR kod bağlantısı aktive ediliyor...");
        // QR kod bağlantısının aktive edilmesi veya başka bir işlem burada yapılabilir.
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
    return deg * (Math.PI / 180);
}
