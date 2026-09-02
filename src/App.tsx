import React, { useState } from 'react';
import { UserRole, ClinicalHistoryItem, Recommendation, ReviewItem, Doctor, Appointment } from './types';
import {
  INITIAL_PATIENT,
  CLINICAL_HISTORY,
  INITIAL_RECOMMENDATIONS,
  INITIAL_REVIEWS,
  DOCTORS_LIST,
  SYSTEM_LOGS,
  SAMPLE_APPOINTMENTS
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { XRayModal } from './components/XRayModal';
import { NotificationModal } from './components/NotificationModal';
import { RecommendationDetailModal } from './screens/RecommendationDetailModal';
import { DoctorRecommendationBuilder } from './screens/DoctorRecommendationBuilder';
import { DoctorDashboard } from './screens/DoctorDashboard';
import { PatientHome } from './screens/PatientHome';
import { PatientUploadReport } from './screens/PatientUploadReport';
import { AdminDashboard } from './screens/AdminDashboard';
import { PatientReportsList } from './screens/PatientReportsList';
import { CalendarView } from './screens/CalendarView';
import { ProfileView } from './screens/ProfileView';

export default function App() {
  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState<UserRole>('patient');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [screenOverride, setScreenOverride] = useState<string | null>(null);

  // Application Data State
  const [patient] = useState(INITIAL_PATIENT);
  const [clinicalHistory, setClinicalHistory] = useState<ClinicalHistoryItem[]>(CLINICAL_HISTORY);
  const [recommendation, setRecommendation] = useState<Recommendation>(INITIAL_RECOMMENDATIONS[0]);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [doctors, setDoctors] = useState<Doctor[]>(DOCTORS_LIST);
  const [logs, setLogs] = useState(SYSTEM_LOGS);
  const [appointments, setAppointments] = useState<Appointment[]>(SAMPLE_APPOINTMENTS);

  // Modals & Toast State
  const [xrayModalOpen, setXrayModalOpen] = useState(false);
  const [selectedXRay, setSelectedXRay] = useState<{ title: string; date: string; imageUrl?: string }>({
    title: 'Panoramic X-Ray (Orthopantomogram)',
    date: 'Oct 12, 2023'
  });
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [recDetailModalOpen, setRecDetailModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Switch roles and adjust sensible default tabs
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    setScreenOverride(null);
    setActiveTab('home');
    showToast(`Switched to ${role === 'doctor' ? 'Doctor Portal (Dr. Sarah Wilson)' : role === 'patient' ? 'Patient Portal (John Smith)' : 'Clinic Admin Dashboard'}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setScreenOverride(null);
  };

  // Action Handlers
  const handleSaveDraft = (draft: Partial<Recommendation>) => {
    setRecommendation((prev) => ({ ...prev, ...draft }));
    showToast('Draft recommendation saved successfully.');
  };

  const handleSendRecommendation = (updatedRec: Recommendation) => {
    setRecommendation(updatedRec);
    showToast(`Recommendation "${updatedRec.title}" successfully sent to ${patient.name}!`);
  };

  const handleReviewItem = (item: ReviewItem) => {
    // Open recommendation builder for this review case
    setCurrentRole('doctor');
    setScreenOverride('doctor-builder');
    showToast(`Opening clinical review for ${item.patientName}...`);
  };

  const handleDismissItem = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review item dismissed.');
  };

  const handleUploadReportSuccess = (newReport: {
    type: string;
    title: string;
    date: string;
    notes: string;
    fileName: string;
  }) => {
    const newItem: ClinicalHistoryItem = {
      id: `rep-${Date.now()}`,
      type: (newReport.type as 'xray' | 'blood' | 'treatment') || 'xray',
      title: newReport.title,
      date: 'Uploaded Today',
      status: 'Pending Review',
      highlightBorder: true,
      icon: newReport.type === 'xray' ? 'radiology' : newReport.type === 'blood' ? 'summarize' : 'description',
      details: newReport.notes || 'Uploaded by patient for clinical review.'
    };

    setClinicalHistory((prev) => [newItem, ...prev]);

    // Also add to Doctor's review list!
    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      patientId: patient.id,
      patientName: patient.name,
      patientInitials: 'JS',
      type: newReport.type,
      title: `${newReport.title} Uploaded`,
      timeAgo: 'Just now',
      date: 'Today',
      icon: newItem.icon,
      status: 'pending'
    };
    setReviews((prev) => [newReview, ...prev]);

    setScreenOverride(null);
    setActiveTab('reports');
    showToast(`Report "${newReport.title}" uploaded! Sent to Dr. Sarah Wilson for review.`);
  };

  const handleViewHistoryItem = (item: ClinicalHistoryItem) => {
    if (item.type === 'xray') {
      setSelectedXRay({
        title: item.title,
        date: item.date,
        imageUrl: item.imageUrl
      });
      setXrayModalOpen(true);
    } else {
      showToast(`Viewing: ${item.title} - ${item.details || item.date}`);
    }
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'profile':
        setActiveTab('profile');
        break;
      case 'reports':
        setActiveTab('reports');
        break;
      case 'xrays':
        setSelectedXRay({
          title: 'Panoramic Radiograph Archive',
          date: 'Oct 12, 2023'
        });
        setXrayModalOpen(true);
        break;
      case 'recommendations':
        setRecDetailModalOpen(true);
        break;
      case 'appointments':
        setActiveTab('calendar');
        break;
      case 'notifications':
        setNotificationModalOpen(true);
        break;
      case 'contact':
        showToast('Direct message channel opened with Dr. Sarah Wilson.');
        break;
      case 'settings':
        setActiveTab('profile');
        break;
      default:
        break;
    }
  };

  const handleAddDoctor = (doc: Omit<Doctor, 'id'>) => {
    const newDoc: Doctor = {
      ...doc,
      id: `doc-${Date.now()}`
    };
    setDoctors((prev) => [...prev, newDoc]);
    showToast(`${doc.name} successfully registered in clinic system.`);
  };

  // Determine current active screen to display
  const renderContent = () => {
    // 1. Explicit Screen Override (e.g. Upload Report screen or direct builder review)
    if (screenOverride === 'upload-report') {
      return (
        <PatientUploadReport
          onBack={() => setScreenOverride(null)}
          onSubmitSuccess={handleUploadReportSuccess}
        />
      );
    }
    if (screenOverride === 'doctor-builder') {
      return (
        <DoctorRecommendationBuilder
          patient={patient}
          clinicalHistory={clinicalHistory}
          currentRecommendation={recommendation}
          onSaveDraft={handleSaveDraft}
          onSendRecommendation={handleSendRecommendation}
          onViewHistoryItem={handleViewHistoryItem}
        />
      );
    }

    // 2. Tab: Calendar
    if (activeTab === 'calendar') {
      return (
        <CalendarView
          appointments={appointments}
          onBookAppointment={(apt) => {
            setAppointments((prev) => [apt, ...prev]);
            showToast('Dental appointment confirmed!');
          }}
        />
      );
    }

    // 3. Tab: Profile
    if (activeTab === 'profile') {
      return (
        <ProfileView
          currentRole={currentRole}
          patient={patient}
          onRoleChange={handleRoleChange}
        />
      );
    }

    // 4. Tab: Reports
    if (activeTab === 'reports') {
      if (currentRole === 'doctor') {
        return (
          <DoctorDashboard
            reviews={reviews}
            onReviewItem={handleReviewItem}
            onDismissItem={handleDismissItem}
            onNavigateToBuilder={() => setScreenOverride('doctor-builder')}
          />
        );
      }
      return (
        <PatientReportsList
          reports={clinicalHistory}
          onUploadClick={() => setScreenOverride('upload-report')}
          onViewReport={handleViewHistoryItem}
        />
      );
    }

    // 5. Tab: Advice / Recommendations
    if (activeTab === 'advice') {
      if (currentRole === 'doctor') {
        // Screen 1: Recommendation Builder
        return (
          <DoctorRecommendationBuilder
            patient={patient}
            clinicalHistory={clinicalHistory}
            currentRecommendation={recommendation}
            onSaveDraft={handleSaveDraft}
            onSendRecommendation={handleSendRecommendation}
            onViewHistoryItem={handleViewHistoryItem}
          />
        );
      } else {
        // Patient viewing full recommendation
        return (
          <main className="max-w-[1000px] mx-auto px-4 md:px-8 py-6 pb-28 md:pb-8 w-full">
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#fbbf24] bg-amber-500/10 border border-amber-500/25 px-3 py-1 rounded-full">
                    Clinical Advice
                  </span>
                  <h1 className="text-2xl font-bold text-white mt-3 tracking-tight">
                    {recommendation.title}
                  </h1>
                  <p className="text-xs text-[#a1a1aa] mt-1">
                    Issued by {recommendation.doctorName} • {recommendation.date}
                  </p>
                </div>
                <button
                  onClick={() => setRecDetailModalOpen(true)}
                  className="px-5 py-2 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold rounded-full hover:brightness-105 transition-all shadow-md cursor-pointer"
                >
                  Expand Full Sheet
                </button>
              </div>

              <div className="p-4 bg-[#0d0d0d] border-l-2 border-[#fbbf24] rounded-r-xl my-4">
                <p className="text-xs uppercase tracking-wider font-semibold text-[#fbbf24]">Treatment Recommendation:</p>
                <p className="text-sm text-zinc-200 mt-1">{recommendation.treatmentPlan}</p>
              </div>

              <div className="space-y-3 text-xs text-zinc-300">
                <p className="p-3 bg-[#0d0d0d] border border-white/10 rounded-xl">
                  <strong className="text-white block mb-1 uppercase tracking-wider text-[10px]">Observations:</strong> {recommendation.observations}
                </p>
                <p className="p-3 bg-[#0d0d0d] border border-white/10 rounded-xl">
                  <strong className="text-white block mb-1 uppercase tracking-wider text-[10px]">Prescriptions:</strong> {recommendation.medications}
                </p>
                <p className="p-3 bg-[#0d0d0d] border border-white/10 rounded-xl">
                  <strong className="text-white block mb-1 uppercase tracking-wider text-[10px]">Instructions:</strong> {recommendation.followUpNotes}
                </p>
              </div>
            </div>
          </main>
        );
      }
    }

    // 6. Tab: Home (Default role-specific screen)
    if (currentRole === 'doctor') {
      // Screen 2: Doctor Dashboard
      return (
        <DoctorDashboard
          reviews={reviews}
          onReviewItem={handleReviewItem}
          onDismissItem={handleDismissItem}
          onNavigateToBuilder={() => setScreenOverride('doctor-builder')}
        />
      );
    }

    if (currentRole === 'admin') {
      // Screen 5: Admin Dashboard
      return (
        <AdminDashboard
          doctors={doctors}
          logs={logs}
          onAddDoctor={handleAddDoctor}
          onAuditLogsClick={() => showToast('Audit logs exported to secure clinical ledger.')}
        />
      );
    }

    // Default: Patient Home (Screen 4)
    return (
      <PatientHome
        latestRecommendation={recommendation}
        onViewRecommendationDetails={() => setRecDetailModalOpen(true)}
        onQuickAction={handleQuickAction}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans relative selection:bg-[#fbbf24] selection:text-[#0a0a0a]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#141414] border border-amber-500/40 text-white px-5 py-2.5 rounded-full shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-[18px] text-[#fbbf24]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenNotifications={() => setNotificationModalOpen(true)}
        notificationCount={reviews.length}
        onBack={
          screenOverride ? () => setScreenOverride(null) : undefined
        }
        backTitle={
          screenOverride === 'upload-report'
            ? 'Upload Report'
            : screenOverride === 'doctor-builder'
            ? 'Recommendation Builder'
            : undefined
        }
      />

      {/* Quick Screen Switcher bar to jump directly to any of the 5 exact screens */}
      <div className="bg-[#0f0f0f] border-b border-white/10 py-2.5 px-4 text-xs">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between flex-wrap gap-2">
          <span className="text-[#a1a1aa] font-medium flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px] text-[#fbbf24]">view_carousel</span>
            Direct Screen Jump:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                setCurrentRole('doctor');
                setScreenOverride('doctor-builder');
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                screenOverride === 'doctor-builder'
                  ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] border-transparent shadow-xs font-bold'
                  : 'bg-[#141414] border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
              }`}
            >
              1. Recommendation Builder (Doctor)
            </button>
            <button
              onClick={() => {
                setCurrentRole('doctor');
                setScreenOverride(null);
                setActiveTab('home');
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                currentRole === 'doctor' && !screenOverride && activeTab === 'home'
                  ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] border-transparent shadow-xs font-bold'
                  : 'bg-[#141414] border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
              }`}
            >
              2. Doctor Dashboard
            </button>
            <button
              onClick={() => {
                setCurrentRole('patient');
                setScreenOverride('upload-report');
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                screenOverride === 'upload-report'
                  ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] border-transparent shadow-xs font-bold'
                  : 'bg-[#141414] border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
              }`}
            >
              3. Upload Report (Patient)
            </button>
            <button
              onClick={() => {
                setCurrentRole('patient');
                setScreenOverride(null);
                setActiveTab('home');
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                currentRole === 'patient' && !screenOverride && activeTab === 'home'
                  ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] border-transparent shadow-xs font-bold'
                  : 'bg-[#141414] border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
              }`}
            >
              4. Patient Home (John)
            </button>
            <button
              onClick={() => {
                setCurrentRole('admin');
                setScreenOverride(null);
                setActiveTab('home');
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                currentRole === 'admin' && !screenOverride && activeTab === 'home'
                  ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] border-transparent shadow-xs font-bold'
                  : 'bg-[#141414] border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
              }`}
            >
              5. Admin Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Content View */}
      <div className="flex-1 flex flex-col">
        {renderContent()}
      </div>

      {/* Bottom Navigation Bar (Mobile) */}
      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Modals */}
      <XRayModal
        isOpen={xrayModalOpen}
        onClose={() => setXrayModalOpen(false)}
        title={selectedXRay.title}
        date={selectedXRay.date}
        imageUrl={selectedXRay.imageUrl}
      />

      <NotificationModal
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        notifications={[
          {
            id: 'notif-1',
            title: 'Dr. Sarah Wilson issued a recommendation',
            desc: 'Wisdom tooth extraction plan ready for review.',
            time: '2m ago',
            read: false,
            icon: 'recommend'
          },
          {
            id: 'notif-2',
            title: 'Report upload acknowledged',
            desc: 'Annual X-Ray 2024 received by clinical desk.',
            time: '1h ago',
            read: false,
            icon: 'cloud_done'
          },
          {
            id: 'notif-3',
            title: 'Appointment Confirmed',
            desc: 'Upcoming extraction scheduled for Nov 15 at 09:30 AM.',
            time: 'Yesterday',
            read: true,
            icon: 'event'
          }
        ]}
        onMarkAllAsRead={() => showToast('All notifications marked as read.')}
      />

      <RecommendationDetailModal
        isOpen={recDetailModalOpen}
        onClose={() => setRecDetailModalOpen(false)}
        recommendation={recommendation}
        onScheduleAppointment={() => {
          setActiveTab('calendar');
          showToast('Navigating to Appointment Calendar...');
        }}
      />
    </div>
  );
}
