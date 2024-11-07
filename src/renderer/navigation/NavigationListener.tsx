import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavigationListener() {
  const navigate = useNavigate();

  useEffect(() => {
    window.electronAPI.onNavigate((page) => {
      navigate(page);
    });

    return () => {
      window.electronAPI.offNavigate();
    };
  }, [navigate]);

  return null;
}
