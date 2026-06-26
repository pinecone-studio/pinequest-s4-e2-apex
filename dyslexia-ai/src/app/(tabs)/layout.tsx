import BottomNav from '../../components/BottomNav';

// Tab screens share the bottom navigation bar (the stack screens do not).
export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </div>
      <BottomNav />
    </>
  );
}
