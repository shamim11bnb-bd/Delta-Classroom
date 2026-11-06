import CourseCard from './CourseCard';

export default function CourseList({ enrolledOnly }: { enrolledOnly?: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CourseCard course={{ id: '1', title: 'Advanced Higher Mathematics' }} />
      <CourseCard course={{ id: '2', title: 'Physics Fundamentals' }} />
      <CourseCard course={{ id: '3', title: 'Organic Chemistry Masterclass' }} />
    </div>
  );
}
