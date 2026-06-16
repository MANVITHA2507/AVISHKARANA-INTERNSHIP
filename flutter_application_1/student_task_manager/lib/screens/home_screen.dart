import 'package:flutter/material.dart';
import '../models/task.dart';
import '../widgets/task_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Task> tasks = [
    Task(id:'1', title:'Math Assignment',
         subject:'Math', priority:'High',
         dueDate:'5/6/2026'),
    Task(id:'2', title:'Science Lab Report',
         subject:'Science', priority:'Medium',
         dueDate:'6/6/2026'),
    Task(id:'3', title:'English Essay',
         subject:'English', priority:'Low',
         dueDate:'7/6/2026'),
  ];

  String _filter = 'All';

  List<Task> get filteredTasks {
    if (_filter == 'Pending') return tasks.where((t) => !t.isDone).toList();
    if (_filter == 'Done')    return tasks.where((t) =>  t.isDone).toList();
    return tasks;
  }

  int get doneCount    => tasks.where((t) =>  t.isDone).length;
  int get pendingCount => tasks.where((t) => !t.isDone).length;

  void _toggleTask(String id) {
    setState(() {
      final t = tasks.firstWhere((t) => t.id == id);
      t.isDone = !t.isDone;
    });
  }

  void _deleteTask(String id) {
    setState(() => tasks.removeWhere((t) => t.id == id));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF0F4FF),
      appBar: AppBar(
        title: Text('📚 Student Task Manager',
          style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: Column(
        children: [
          // Stats
          Padding(
            padding: EdgeInsets.all(16),
            child: Row(
              children: [
                _statCard('Total',   '${tasks.length}', Colors.blue),
                SizedBox(width: 10),
                _statCard('Pending', '$pendingCount',   Colors.orange),
                SizedBox(width: 10),
                _statCard('Done',    '$doneCount',      Colors.green),
              ],
            ),
          ),

          // Filter tabs
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: ['All','Pending','Done'].map((f) =>
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 6),
                child: ChoiceChip(
                  label: Text(f),
                  selected: _filter == f,
                  onSelected: (_) => setState(() => _filter = f),
                  selectedColor: Colors.blue,
                  labelStyle: TextStyle(
                    color: _filter == f ? Colors.white : Colors.black),
                ),
              )
            ).toList(),
          ),
          SizedBox(height: 8),

          // Task list
          Expanded(
            child: filteredTasks.isEmpty
              ? Center(child: Text('No tasks! 🎉',
                  style: TextStyle(color: Colors.grey, fontSize: 16)))
              : ListView.builder(
                  itemCount: filteredTasks.length,
                  itemBuilder: (ctx, i) {
                    final t = filteredTasks[i];
                    return TaskCard(
                      task: t,
                      onToggle: () => _toggleTask(t.id),
                      onDelete: () => _deleteTask(t.id),
                    );
                  },
                ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        icon: Icon(Icons.add),
        label: Text('Add Task'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
    );
  }

  Widget _statCard(String label, String value, Color color) {
    return Expanded(
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border(top: BorderSide(color: color, width: 3)),
          boxShadow: [BoxShadow(
            color: Colors.black12, blurRadius: 6, offset: Offset(0,2))],
        ),
        child: Column(children: [
          Text(value, style: TextStyle(
            fontSize: 22, fontWeight: FontWeight.w900, color: color)),
          Text(label, style: TextStyle(
            fontSize: 12, color: Colors.grey, fontWeight: FontWeight.w700)),
        ]),
      ),
    );
  }
}