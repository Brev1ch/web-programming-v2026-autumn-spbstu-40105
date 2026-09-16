function Splash({onStart}) {
  return (
    <div className="splash" data-testid="splash-screen">
      <h1>Крестики-нолики</h1>
      <p>Выберите режим игры</p>
      <div className="splash-actions">
        <button type="button" onClick={() => onStart('computer')}>
          Против компьютера
        </button>
        <button type="button" onClick={() => onStart('player')}>
          Против другого игрока
        </button>
      </div>
    </div>
  );
}

export default Splash;
