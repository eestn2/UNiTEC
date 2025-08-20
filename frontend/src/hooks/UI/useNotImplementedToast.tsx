import { useState, useCallback, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import NotImplementedToast from '../../components/UI/NotImplementedToast';

export default function useNotImplementedToast() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<ReturnType<typeof ReactDOM.createRoot> | null>(null);

  const triggerToast = useCallback(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    const container = getToastContainer();
    if (!rootRef.current) {
      rootRef.current = ReactDOM.createRoot(container);
    }
    if (show) {
      rootRef.current.render(
        <NotImplementedToast show={true} onClose={() => setShow(false)} />
      );
    } else {
      rootRef.current.render(<></>);
    }
    // Cleanup on unmount
    return () => {
      rootRef.current?.render(<></>);
    };
  }, [show]);

  return triggerToast;
}

function getToastContainer() {
  let container = document.getElementById('not-implemented-toast-root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'not-implemented-toast-root';
    document.body.appendChild(container);
  }
  return container;
}
