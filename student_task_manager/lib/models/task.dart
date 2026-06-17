class Task {
  String id;
  String title;
  String subject;
  String priority;
  String dueDate;
  bool isDone;

  Task({
    required this.id,
    required this.title,
    required this.subject,
    required this.priority,
    required this.dueDate,
    this.isDone = false,
  });
}