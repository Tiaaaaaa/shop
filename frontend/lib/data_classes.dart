class Book {
  final int isbn;
  final String subject;
  final String title;
  final String volume;
  final String publisher;
  final int price;
  final String section;

  const Book({
    required this.isbn,
    required this.subject,
    required this.title,
    required this.volume,
    required this.publisher,
    required this.price,
    required this.section,
  });

  factory Book.fromJson(Map<String, dynamic> json) {
    return Book(
      isbn: json['isbn'] as int,
      subject: json['subject'] as String,
      title: json['title'] as String,
      volume: json['volume'] as String,
      publisher: json['publisher'] as String,
      price: json['price'] as int,
      section: json['section'] as String,
    );
  }
}
