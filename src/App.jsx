
import { useState, useEffect } from 'react'
import { supabase } from './services/superbase'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <h1 className="text-3xl font-bold text-white">
        My TODO app
      </h1>
    </div>
  );
}

export default App;

