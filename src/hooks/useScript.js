// From Alex McMillan, 12/22/2015
// at https://stackoverflow.com/questions/34424845/adding-script-tag-to-react-jsx

import { useEffect } from 'react';

// custom hook to use scripts in components
// e.g. import useScript from 'hooks/useScript';
//      const AnyComponent = () => {useScript('https://use.typekit.net/foobar.js'); }

const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;