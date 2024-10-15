'use client';

import { useState, FormEvent, useMemo, useCallback } from 'react';
import { Group, Student } from '../types';
import { X } from 'lucide-react';

interface GroupFormProps {
  onCreateGroups: (groups: Group[]) => void;
  onResetGroups: () => void;
  onAddStudent: (name: string) => void;
  students: Student[];
  onUpdateStudents: (students: Student[]) => void;
}

export default function GroupForm({ onCreateGroups, onResetGroups, onAddStudent, students, onUpdateStudents }: GroupFormProps) {
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [numberOfTeams, setNumberOfTeams] = useState<number>(1);
    const [manualStudent, setManualStudent] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [editingStudent, setEditingStudent] = useState<string | null>(null);

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const shuffledStudents = [...selectedStudents].sort(() => Math.random() - 0.5);
        const teams: Group[] = Array.from({ length: numberOfTeams }, (_, i) => ({
            id: i + 1,
            name: `Team ${i + 1}`,
            members: []
        }));

        shuffledStudents.forEach((student, index) => {
            const teamIndex = index % numberOfTeams;
            teams[teamIndex].members.push(student);
        });

        onCreateGroups(teams);
    }, [selectedStudents, numberOfTeams, onCreateGroups]);

    const handleReset = useCallback(() => {
        setSelectedStudents([]);
        setNumberOfTeams(1);
        setManualStudent('');
        onResetGroups();
    }, [onResetGroups]);

    const handleToggleAll = useCallback(() => {
        if (selectedStudents.length === students.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(students.map(student => student.name));
        }
    }, [selectedStudents, students]);

    const handleAddManualStudent = () => {
        if (manualStudent && !students.some(student => student.name === manualStudent)) {
            onAddStudent(manualStudent);
            setSelectedStudents([...selectedStudents, manualStudent]);
            setManualStudent('');
        }
    };

    const handleRemoveStudent = (studentToRemove: string) => {
        setSelectedStudents(selectedStudents.filter(student => student !== studentToRemove));
        const updatedStudents = students.filter(student => student.name !== studentToRemove);
        onUpdateStudents(updatedStudents);
    };

    const handleEditStudent = (oldName: string, newName: string) => {
        if (newName && newName !== oldName && !students.some(student => student.name === newName)) {
            const updatedStudents = students.map(student => 
                student.name === oldName ? { ...student, name: newName } : student
            );
            onUpdateStudents(updatedStudents);
            setSelectedStudents(selectedStudents.map(name => name === oldName ? newName : name));
            setEditingStudent(null);
        }
    };

    const filteredStudents = useMemo(() => {
        return students.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [students, searchTerm]);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="numberOfTeams" className="block text-sm font-medium mb-1">
                    Number of Teams
                </label>
                <input
                    type="number"
                    id="numberOfTeams"
                    value={numberOfTeams}
                    onChange={(e) => setNumberOfTeams(Math.max(1, parseInt(e.target.value, 10)))}
                    className="w-full px-3 py-2 bg-background text-foreground border border-input rounded-[var(--radius)] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    min="1"
                    required
                />
            </div>
            <div>
                <label htmlFor="manualStudent" className="block text-sm font-medium mb-1">
                    Add Participant
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="manualStudent"
                        value={manualStudent}
                        onChange={(e) => setManualStudent(e.target.value)}
                        className="flex-grow px-3 py-2 bg-background text-foreground border border-input rounded-l-[var(--radius)] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter student name"
                    />
                    <button
                        type="button"
                        onClick={handleAddManualStudent}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-r-[var(--radius)] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                    >
                        Add
                    </button>
                </div>
            </div>
            <div>
                <label htmlFor="searchStudent" className="block text-sm font-medium mb-1">
                    Search Participants
                </label>
                <input
                    type="text"
                    id="searchStudent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 bg-background text-foreground border border-input rounded-[var(--radius)] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Search for a student"
                />
            </div>
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">Participants</label>
                    <button
                        type="button"
                        onClick={handleToggleAll}
                        className="text-sm text-primary hover:underline focus:outline-none"
                    >
                        {selectedStudents.length === students.length ? 'Deselect All' : 'Select All'}
                    </button>
                </div>
                <div className="max-h-48 overflow-y-auto bg-muted rounded-[var(--radius)] p-2">
                    {filteredStudents.map((student) => (
                        <div key={student.id} className="flex items-center justify-between mb-2 last:mb-0 bg-background rounded-md p-2">
                            <div className="flex items-center flex-grow">
                                <input
                                    type="checkbox"
                                    id={student.name}
                                    value={student.name}
                                    checked={selectedStudents.includes(student.name)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedStudents([...selectedStudents, student.name]);
                                        } else {
                                            setSelectedStudents(selectedStudents.filter((s) => s !== student.name));
                                        }
                                    }}
                                    className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
                                />
                                {editingStudent === student.name ? (
                                    <input
                                        type="text"
                                        value={student.name}
                                        onChange={(e) => handleEditStudent(student.name, e.target.value)}
                                        onBlur={() => setEditingStudent(null)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleEditStudent(student.name, e.currentTarget.value);
                                            }
                                        }}
                                        className="ml-2 px-2 py-1 text-sm border rounded"
                                        autoFocus
                                    />
                                ) : (
                                    <span
                                        onDoubleClick={() => setEditingStudent(student.name)}
                                        className="ml-2 text-sm flex-grow cursor-pointer"
                                    >
                                        {student.name}
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveStudent(student.name)}
                                className="text-destructive hover:text-destructive/80 focus:outline-none"
                                aria-label={`Remove ${student.name}`}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-[var(--radius)] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedStudents.length === 0}
                >
                    Create Teams
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-[var(--radius)] hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-300 transform hover:scale-105"
                >
                    Reset
                </button>
            </div>
        </form>
    );
}
