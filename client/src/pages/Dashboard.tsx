import { useEffect, useState } from 'react';
import { api, type Zone, type Reading } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplet, Thermometer } from 'lucide-react';

export function Dashboard() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const [history, setHistory] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);

  // Load zones 
  useEffect(() => {
    api.getZones().then((data) => {
      setZones(data);
      if (data.length > 0) setSelectedZoneId(data[0].id); // Select first zone by default
      setLoading(false);
    });
  }, []);

  // Load history when selected zone changes
  useEffect(() => {
    if (!selectedZoneId) return;

    const fetchHistory = () => {
      api.getZoneHistory(selectedZoneId).then(setHistory);
    };

    fetchHistory();
    // Refresh every 2 seconds to see live updates
    const interval = setInterval(fetchHistory, 2000);
    return () => clearInterval(interval);
  }, [selectedZoneId]);

  if (loading) return <div className="p-10">Loading SAMS...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">SAMS Operations</h1>
        <p className="text-gray-600">Smart Agriculture Monitoring System</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Zone List */}
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Field Zones</h2>
          {zones.map((zone) => (
            <div 
              key={zone.id}
              onClick={() => setSelectedZoneId(zone.id)}
              className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                selectedZoneId === zone.id 
                  ? 'border-blue-500 bg-white shadow-md' 
                  : 'border-transparent bg-white hover:bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{zone.name}</h3>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  {zone.cropType}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Target Moisture: {zone.requiredMoisturePercent}%
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Charts & Data */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedZoneId && history.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Live Telemetry: Zone {selectedZoneId}</h2>
                
                {/* Current Stats */}
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Droplet size={20} />
                    <span className="font-bold">{history[history.length - 1].moisturePercent}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-600">
                    <Thermometer size={20} />
                    <span className="font-bold">{history[history.length - 1].temperatureCelsius}°C</span>
                  </div>
                </div>
              </div>

              {/* The Graph */}
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="createdAt" 
                      tickFormatter={(time) => new Date(time).toLocaleTimeString()} 
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      labelFormatter={(label) => new Date(label).toLocaleString()}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="moisturePercent" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      name="Moisture %"
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="humidityPercent" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      name="Humidity %" 
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              Waiting for sensor data...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}