import { useEffect, useState } from 'react';
import './App.css';

const initialState = {
  health: null,
  checklist: [],
  summary: null,
  error: '',
};

function App() {
  const [{ health, checklist, summary, error }, setState] = useState(initialState);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [healthResponse, checklistResponse] = await Promise.all([
          fetch('/api/health'),
          fetch('/api/checklist'),
        ]);

        const healthPayload = await healthResponse.json();
        const checklistPayload = await checklistResponse.json();

        setState({
          health: healthPayload,
          checklist: checklistPayload.items,
          summary: checklistPayload.summary,
          error: '',
        });
      } catch (loadError) {
        setState((current) => ({
          ...current,
          error: 'No fue posible cargar el checklist.',
        }));
      }
    }

    loadDashboard();
  }, []);

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Checklist de entrega</p>
        <h1>DojoSolutions Full Delivery Dashboard</h1>
        <p className="description">
          Vista única para verificar aplicación, plataforma, seguridad, observabilidad y evidencias.
        </p>
      </section>

      <section className="status-grid" aria-label="Resumen del checklist">
        <article className="card">
          <span>Estado API</span>
          <strong>{health?.status === 'ok' ? 'API operativa' : 'Sin datos'}</strong>
          <small>{health?.mongoConnected ? 'MongoDB conectada' : 'MongoDB lista por configuración'}</small>
        </article>
        <article className="card">
          <span>Items completados</span>
          <strong>{summary?.completed ?? 0}</strong>
          <small>de {summary?.total ?? 0} requisitos</small>
        </article>
        <article className="card">
          <span>Pendientes</span>
          <strong>{summary?.pending ?? 0}</strong>
          <small>El objetivo es cerrar todo en cero</small>
        </article>
      </section>

      {error ? <p className="error-banner">{error}</p> : null}

      <section className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Requisito</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Evidencia</th>
            </tr>
          </thead>
          <tbody>
            {checklist.map((item) => (
              <tr key={item.requirement}>
                <td>{item.requirement}</td>
                <td>{item.category}</td>
                <td>
                  <span className="badge">{item.status}</span>
                </td>
                <td>
                  <code>{item.evidence}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default App;
