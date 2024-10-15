'use client';

import { useState } from 'react';
import GroupList from './components/GroupList';
import GroupForm from './components/GroupForm';
import StudentList from './components/StudentList';
import { Group, Student } from './types';
import dynamic from 'next/dynamic';
import { useStore } from './store/useStore';
import ShuffleAnimation from './components/ShuffleAnimation';
import LoadingSpinner from './components/LoadingSpinner';
import Image from 'next/image';

const ConfettiWrapper = dynamic(() => import('./components/ConfettiWrapper'), {
  ssr: false,
});

export default function Home() {
  const {
    groups,
    showTeams,
    students,
    triggerConfetti,
    isLoading,
    handleCreateGroups,
    handleResetGroups,
    handleAddStudent,
    setStudents,
    setIsLoading,
  } = useStore();

  const [showShuffleAnimation, setShowShuffleAnimation] = useState(false);

  const handleUpdateStudents = (updatedStudents: Student[]) => {
    setStudents(updatedStudents);
  };

  const handleCreateGroupsWithAnimation = (newGroups: Group[]) => {
    setIsLoading(true);
    setShowShuffleAnimation(true);
    setTimeout(() => {
      setShowShuffleAnimation(false);
      handleCreateGroups(newGroups);
      setIsLoading(false);
    }, 5000);
  };

  return (
    <>
      <ConfettiWrapper trigger={triggerConfetti} />
      {showShuffleAnimation && (
        <ShuffleAnimation
          students={students}
          duration={5000}
          onComplete={() => setShowShuffleAnimation(false)}
        />
      )}
      {/* {isLoading && <LoadingSpinner />} */}
      <div className="h-full bg-background text-foreground p-6 overflow-auto relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2">
              <div className="p-6 transition-all duration-300">
                <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
                  {showTeams ? 'Teams' : 'Members'}
                </h2>
                {students.length === 0 ? (
                  <div className="text-center py-12">
                    <Image
                      loader={({ src }) => src}
                      src="https://api.dicebear.com/9.x/bottts/svg?seed=teamBot"
                      alt="Team Avatar"
                      width={96}
                      height={96}
                      className="mx-auto"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-card-foreground">No participants yet</h3>
                    <p className="mt-2 text-muted-foreground">Get started by adding participants to your team.</p>
                  </div>
                ) : showTeams ? (
                  <GroupList groups={groups} students={students} />
                ) : (
                  <StudentList students={students} />
                )}
              </div>
            </section>
            <section className="lg:col-span-1">
              <div className="bg-card rounded-[var(--radius)] shadow-lg p-6 sticky top-8 transition-all duration-300 hover:shadow-xl">
                <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Create Teams</h2>
                <GroupForm
                  onCreateGroups={handleCreateGroupsWithAnimation}
                  onResetGroups={handleResetGroups}
                  onAddStudent={handleAddStudent}
                  students={students}
                  onUpdateStudents={handleUpdateStudents}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 left-4 text-[8px] text-muted-foreground bg-background/80 backdrop-blur-sm rounded-[var(--radius)] p-2 shadow-md">
        Created by <a href="https://jlemuel.xyz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">JLemuel</a>
      </div>
    </>
  );
}
