'use client';

import { Group, Student } from '../types';
import { useState } from 'react';
import TeamModal from './TeamModal';
import Image from 'next/image';

interface GroupListProps {
    groups: Group[];
    students: Student[];
}

export default function GroupList({ groups, students = [] }: GroupListProps) {
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const handleGroupClick = (group: Group) => {
        setSelectedGroup(group);
    };

    const handleCloseModal = () => {
        setSelectedGroup(null);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groups.map((group) => (
                    <div
                        key={group.id}
                        className="bg-card rounded-[var(--radius)] p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                        onClick={() => handleGroupClick(group)}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-primary">{group.name}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {group.members.map((memberName, index) => {
                                const student = students.find(s => s.name === memberName);
                                return (
                                    <div key={index} className="flex items-center space-x-3 bg-muted p-3 rounded-[calc(var(--radius)-0.25rem)] transition-all duration-300 hover:bg-muted/80">
                                        <Image
                                            loader={({ src }) => src}
                                            src={student?.avatarUrl || ''}
                                            alt={memberName}
                                            width={40}
                                            height={40}
                                            className="rounded-full border-2 border-primary"
                                        />
                                        <span className="text-sm font-medium truncate">{memberName}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            {selectedGroup && (
                <TeamModal
                    group={selectedGroup}
                    students={students}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}
