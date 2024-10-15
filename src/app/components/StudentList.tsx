'use client';

import React from 'react';
import Image from 'next/image';
import { Student } from '../types';

interface StudentListProps {
    students: Student[];
}

const StudentCard = React.memo(({ student }: { student: Student }) => {
  return (
    <div className="bg-card rounded-[var(--radius)] p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
      <div className="flex items-center space-x-4">
        <Image
          src={student.avatarUrl}
          alt={student.name}
          width={48}    
          height={48}
          className="rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-lg font-medium text-card-foreground truncate">
            {student.name}
          </p>
        </div>
      </div>
    </div>
  );
});

const StudentList = React.memo(({ students }: StudentListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
});

export default StudentList;
