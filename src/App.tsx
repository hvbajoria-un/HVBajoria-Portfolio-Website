import { ReactLenis } from 'lenis/react';
import { Background3D } from './components/Background3D';
import { Overlay } from './components/Overlay';

export default function App() {
  return (
    <ReactLenis root>
      <main className="relative w-full h-full min-h-screen">
        <Background3D />
        <Overlay />
      </main>
    </ReactLenis>
  );
}
