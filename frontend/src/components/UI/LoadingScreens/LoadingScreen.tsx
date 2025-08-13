
import Player from 'lottie-react';
import throbber from '../../../assets/animated/loading_square.json';
import whiteBriefcase from '../../../assets/unitec/white.svg';
import './blockFooter.css'
export default function LoadingScreen() {
  return (
    <div style={styles.container}>
      <div style={styles.maskWrapper}>
        <svg
          width={140}
          height={126}
          viewBox="0 0 140 126"
          preserveAspectRatio="none"
          style={{ position: 'absolute', width: 140, height: 126 }}
        >

          <defs>
            <mask id="briefcase-mask" maskUnits="userSpaceOnUse">
              <image
                href={whiteBriefcase}
                width={140}
                height={126}
                style={{}}
              // El SVG blanco será la máscara
              />
            </mask>
          </defs>
          <g mask="url(#briefcase-mask)">
            <foreignObject width="140" height="126">
              <div style={{ width: '100%', height: '100%' }}>
                <Player
                  autoplay
                  loop
                  animationData={throbber}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </foreignObject>
          </g>
        </svg>
      </div> 
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff', 
  },
  maskWrapper: {
    position: 'relative' as const,
    width: 140,
    height: 126,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: '24px',
    fontSize: '1.2rem',
  },
};
