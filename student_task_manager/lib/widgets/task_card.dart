import 'package:flutter/material.dart';
import '../models/task.dart';

class TaskCard extends StatelessWidget {
  final Task task;
  final VoidCallback onToggle;
  final VoidCallback onDelete;

  const TaskCard({
    super.key,
    required this.task,
    required this.onToggle,
    required this.onDelete,
  });

  Color get priorityColor {
    switch (task.priority) {
      case 'High':   return Colors.red;
      case 'Medium': return Colors.orange;
      default:       return Colors.green;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListTile(
        leading: GestureDetector(
          onTap: onToggle,
          child: Icon(
            task.isDone
              ? Icons.check_circle
              : Icons.radio_button_unchecked,
            color: task.isDone ? Colors.green : Colors.grey,
            size: 28,
          ),
        ),
        title: Text(
          task.title,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            decoration: task.isDone
              ? TextDecoration.lineThrough
              : TextDecoration.none,
            color: task.isDone ? Colors.grey : Colors.black,
          ),
        ),
        subtitle: Row(
          children: [
            Chip(
              label: Text(task.subject,
                style: TextStyle(fontSize: 10)),
              backgroundColor: Colors.blue.shade50,
              padding: EdgeInsets.zero,
            ),
            SizedBox(width: 6),
            Text('📅 ${task.dueDate}',
              style: TextStyle(fontSize: 11)),
          ],
        ),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 10, height: 10,
              decoration: BoxDecoration(
                color: priorityColor,
                shape: BoxShape.circle,
              ),
            ),
            SizedBox(width: 8),
            IconButton(
              icon: Icon(Icons.delete_outline, color: Colors.red),
              onPressed: onDelete,
            ),
          ],
        ),
      ),
    );
  }
}
