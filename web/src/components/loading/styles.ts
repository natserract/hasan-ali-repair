export default () => ({
  container: {
    position: 'fixed',
    backgroundColor: 'rgba(255, 255, 255, 0.313)',
    width: '100%',
    height: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    fontSize: '5rem',
    height: '5rem',
    lineHeight: '3rem',
    position: 'absolute',
    bottom: 40,
    right: 40,
  },
  hidden: {
    display: 'none',
  },
  containerPage: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
