Bir iş yeri oluşturmak için:

POST /api/businesses
{
  "name": "ABC Ltd.",
  "address": "İstanbul, Türkiye",
  "phone": "+902122223344"
}

Bu iş yerine bağlı bir çalışan oluşturmak için (örneğin businessId yukarıdaki iş yerinin ID'si):

POST /api/employees
{
  "name": "Mehmet Can",
  "position": "Satış Müdürü",
  "phone": "+905556667778",
  "businessId": "iş_yerinin_id'si"
}
