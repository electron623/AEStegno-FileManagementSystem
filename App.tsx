import { useState } from 'react';
import { Lock, Shield, CheckCircle, XCircle, Upload, Video, Key } from 'lucide-react';

type Phase = 'encryption' | 'verification';

export default function App() {
  const [activePhase, setActivePhase] = useState<Phase>('encryption');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info' | null; message: string }>({ type: null, message: '' });

  // Encryption form state
  const [encryptionData, setEncryptionData] = useState({
    username: '',
    password: '',
    aesFile: null as File | null,
    inputVideo: null as File | null,
    outputVideoName: ''
  });

  // Verification form state
  const [verificationData, setVerificationData] = useState({
    videoFile: null as File | null,
    aesFile: null as File | null
  });

  const handleEncryption = (e: React.FormEvent) => {
    e.preventDefault();

    if (!encryptionData.username || !encryptionData.password || !encryptionData.aesFile || !encryptionData.inputVideo || !encryptionData.outputVideoName) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    // Simulate encryption process
    setTimeout(() => {
      setStatus({
        type: 'success',
        message: `Hash embedded successfully! Video saved as ${encryptionData.outputVideoName}`
      });
    }, 1500);
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificationData.videoFile || !verificationData.aesFile) {
      setStatus({ type: 'error', message: 'Please select both video and AES file' });
      return;
    }

    // Simulate verification process
    setTimeout(() => {
      const isAuthentic = Math.random() > 0.5;
      if (isAuthentic) {
        setStatus({
          type: 'success',
          message: 'FILE IS AUTHENTIC - Decrypted file created successfully'
        });
      } else {
        setStatus({
          type: 'error',
          message: 'FILE IS TAMPERED - Backup file created for safety'
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Video Hash Authentication</h1>
          </div>
          <p className="text-slate-300">Secure video integrity verification using SHA256 hash embedding</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          {/* Phase Tabs */}
          <div className="flex border-b border-slate-700">
            <button
              onClick={() => {
                setActivePhase('encryption');
                setStatus({ type: null, message: '' });
              }}
              className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                activePhase === 'encryption'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800/30 text-slate-400 hover:bg-slate-800/50'
              }`}
            >
              <Lock className="w-5 h-5" />
              Encryption Phase
            </button>
            <button
              onClick={() => {
                setActivePhase('verification');
                setStatus({ type: null, message: '' });
              }}
              className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                activePhase === 'verification'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800/30 text-slate-400 hover:bg-slate-800/50'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              Verification Phase
            </button>
          </div>

          <div className="p-8">
            {/* Status Message */}
            {status.type && (
              <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                status.type === 'success' ? 'bg-green-500/20 border border-green-500/30' :
                status.type === 'error' ? 'bg-red-500/20 border border-red-500/30' :
                'bg-blue-500/20 border border-blue-500/30'
              }`}>
                {status.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : status.type === 'error' ? (
                  <XCircle className="w-5 h-5 text-red-400" />
                ) : null}
                <p className={`${
                  status.type === 'success' ? 'text-green-300' :
                  status.type === 'error' ? 'text-red-300' :
                  'text-blue-300'
                }`}>{status.message}</p>
              </div>
            )}

            {/* Encryption Phase Form */}
            {activePhase === 'encryption' && (
              <form onSubmit={handleEncryption} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={encryptionData.username}
                      onChange={(e) => setEncryptionData({...encryptionData, username: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={encryptionData.password}
                      onChange={(e) => setEncryptionData({...encryptionData, password: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Key className="w-4 h-4 inline mr-2" />
                    AES File
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => setEncryptionData({...encryptionData, aesFile: e.target.files?.[0] || null})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                    />
                  </div>
                  {encryptionData.aesFile && (
                    <p className="text-sm text-slate-400 mt-2">Selected: {encryptionData.aesFile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Video className="w-4 h-4 inline mr-2" />
                    Input Video
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setEncryptionData({...encryptionData, inputVideo: e.target.files?.[0] || null})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                    />
                  </div>
                  {encryptionData.inputVideo && (
                    <p className="text-sm text-slate-400 mt-2">Selected: {encryptionData.inputVideo.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Output Video Name
                  </label>
                  <input
                    type="text"
                    value={encryptionData.outputVideoName}
                    onChange={(e) => setEncryptionData({...encryptionData, outputVideoName: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="output_video.avi"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50"
                >
                  <Lock className="w-5 h-5" />
                  Embed Hash & Encrypt
                </button>
              </form>
            )}

            {/* Verification Phase Form */}
            {activePhase === 'verification' && (
              <form onSubmit={handleVerification} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Video className="w-4 h-4 inline mr-2" />
                    Video File (.avi)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".avi,video/*"
                      onChange={(e) => setVerificationData({...verificationData, videoFile: e.target.files?.[0] || null})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                    />
                  </div>
                  {verificationData.videoFile && (
                    <p className="text-sm text-slate-400 mt-2">Selected: {verificationData.videoFile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Key className="w-4 h-4 inline mr-2" />
                    AES File
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => setVerificationData({...verificationData, aesFile: e.target.files?.[0] || null})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                    />
                  </div>
                  {verificationData.aesFile && (
                    <p className="text-sm text-slate-400 mt-2">Selected: {verificationData.aesFile.name}</p>
                  )}
                </div>

                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <h3 className="font-medium text-slate-300 mb-2">Verification Process:</h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>Extracts embedded hash from video file</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>Recalculates hash from AES file</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>Compares hashes to verify authenticity</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50"
                >
                  <CheckCircle className="w-5 h-5" />
                  Verify File Integrity
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-slate-400 text-sm">
          <p>🔒 Secure video authentication using SHA256 hash steganography</p>
        </div>
      </div>
    </div>
  );
}