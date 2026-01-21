import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  LineChart,
  Mail,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from 'lucide-react';
import React, { useState } from 'react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: number;
  category: string;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

const assessmentQuestions: Question[] = [
  {
    id: 1,
    category: 'Operations',
    question: 'How do you currently manage your bookings and appointments?',
    options: [
      { text: 'Pen and paper or basic calendar', score: 1 },
      { text: 'Spreadsheets or basic digital tools', score: 2 },
      { text: 'Dedicated booking software with some automation', score: 3 },
      {
        text: 'Comprehensive system with automated reminders and confirmations',
        score: 4,
      },
    ],
  },
  {
    id: 2,
    category: 'Client Acquisition',
    question: 'How do clients typically find and book your services?',
    options: [
      { text: 'Walk-ins and word of mouth only', score: 1 },
      { text: 'Phone calls and social media messages', score: 2 },
      { text: 'Online booking through my website', score: 3 },
      {
        text: 'Multiple online channels with integrated booking system',
        score: 4,
      },
    ],
  },
  {
    id: 3,
    category: 'Analytics',
    question: 'How do you track and analyze your business performance?',
    options: [
      { text: "I don't track metrics regularly", score: 1 },
      { text: 'Basic revenue tracking in spreadsheets', score: 2 },
      {
        text: 'Regular review of key metrics like revenue and client retention',
        score: 3,
      },
      {
        text: 'Comprehensive analytics dashboard with real-time insights',
        score: 4,
      },
    ],
  },
  {
    id: 4,
    category: 'Communication',
    question: 'How do you manage client communication and follow-ups?',
    options: [
      { text: 'Manual phone calls and text messages', score: 1 },
      { text: 'Email and occasional follow-ups', score: 2 },
      { text: 'Automated appointment reminders', score: 3 },
      {
        text: 'Full automated communication with personalized messaging',
        score: 4,
      },
    ],
  },
  {
    id: 5,
    category: 'Marketing',
    question: 'What is your current online presence and marketing strategy?',
    options: [
      { text: 'No online presence or occasional social media posts', score: 1 },
      { text: 'Active on social media but no cohesive strategy', score: 2 },
      { text: 'Regular social media and basic website', score: 3 },
      {
        text: 'Multi-channel marketing with analytics and optimization',
        score: 4,
      },
    ],
  },
  {
    id: 6,
    category: 'Payments',
    question: 'How do you handle payments from clients?',
    options: [
      { text: 'Cash only', score: 1 },
      { text: 'Cash and card with manual tracking', score: 2 },
      { text: 'Integrated payment system with basic reporting', score: 3 },
      {
        text: 'Automated payment processing with detailed financial analytics',
        score: 4,
      },
    ],
  },
  {
    id: 7,
    category: 'Client Data',
    question: 'How do you manage client data and history?',
    options: [
      { text: 'Paper records or memory', score: 1 },
      { text: 'Basic spreadsheet or notes', score: 2 },
      { text: 'Digital client database with service history', score: 3 },
      {
        text: 'Comprehensive CRM with preferences, history, and insights',
        score: 4,
      },
    ],
  },
  {
    id: 8,
    category: 'Efficiency',
    question:
      'How much time do you spend on administrative tasks vs. providing services?',
    options: [
      { text: 'More than 40% of my time on admin work', score: 1 },
      { text: 'About 30-40% on admin tasks', score: 2 },
      { text: 'About 20-30% on admin tasks', score: 3 },
      { text: 'Less than 20% - mostly automated', score: 4 },
    ],
  },
  {
    id: 9,
    category: 'Retention',
    question: 'How do you handle no-shows and cancellations?',
    options: [
      { text: 'I lose revenue with no prevention strategy', score: 1 },
      { text: 'Manual reminder calls before appointments', score: 2 },
      { text: 'Automated reminders to reduce no-shows', score: 3 },
      {
        text: 'Smart booking policies, deposits, and automated reminder system',
        score: 4,
      },
    ],
  },
  {
    id: 10,
    category: 'Pricing',
    question: 'How do you manage your service menu and pricing?',
    options: [
      { text: 'Informal pricing, no structured menu', score: 1 },
      { text: 'Basic price list, rarely updated', score: 2 },
      { text: 'Professional service menu with regular updates', score: 3 },
      {
        text: 'Dynamic pricing with packages, promotions, and analytics',
        score: 4,
      },
    ],
  },
];

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<
    'intro' | 'assessment' | 'results'
  >('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  if (!isOpen) return null;

  const totalQuestions = assessmentQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;
  const currentQuestion = assessmentQuestions[currentQuestionIndex];

  const handleAnswerSelect = (score: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: score });

    // Auto-advance to next question
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Small delay before showing results
        setTimeout(() => setCurrentStep('results'), 400);
      }
    }, 400);
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce(
      (sum, score) => sum + score,
      0
    );
    const maxScore = totalQuestions * 4;
    return Math.round((totalScore / maxScore) * 100);
  };

  const getMaturityLevel = (score: number) => {
    if (score >= 80)
      return {
        level: 'Advanced',
        color: 'from-emerald-500 to-teal-600',
        textColor: 'text-emerald-700',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        title: 'Highly Optimized',
        description:
          'Your business demonstrates excellence in digital operations. Le Beau can help you scale and reach new markets.',
        icon: Sparkles,
      };
    if (score >= 60)
      return {
        level: 'Intermediate',
        color: 'from-blue-500 to-cyan-600',
        textColor: 'text-blue-700',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        title: 'Solid Foundation',
        description:
          'You have good systems in place. Le Beau can automate your operations and unlock new growth opportunities.',
        icon: Target,
      };
    if (score >= 40)
      return {
        level: 'Developing',
        color: 'from-amber-500 to-orange-600',
        textColor: 'text-amber-700',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        title: 'Building Momentum',
        description:
          "You're on the right path. Le Beau can significantly enhance your efficiency and client experience.",
        icon: TrendingUp,
      };
    return {
      level: 'Emerging',
      color: 'from-violet-500 to-purple-600',
      textColor: 'text-violet-700',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
      title: 'Strong Potential',
      description:
        'Exciting opportunities ahead! Le Beau will transform how you operate and help you stand out.',
      icon: BarChart3,
    };
  };

  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setEmailSent(true);
    setIsSubmitting(false);
  };

  const resetAssessment = () => {
    setCurrentStep('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setEmail('');
    setEmailSent(false);
  };

  const handleClose = () => {
    resetAssessment();
    onClose();
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const score = calculateScore();
  const maturity = getMaturityLevel(score);
  const MaturityIcon = maturity.icon;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl md:rounded-3xl rounded-t-3xl shadow-2xl max-w-4xl w-full my-auto relative md:my-8 max-h-[95vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 group"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </button>

        {/* Intro Step */}
        {currentStep === 'intro' && (
          <div className="p-6 sm:p-12 md:p-16 min-h-screen md:min-h-0 flex flex-col justify-center">
            <div className="max-w-2xl mx-auto w-full">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#07c6e8]/10 rounded-full mb-6 md:mb-8">
                <div className="w-2 h-2 bg-[#07c6e8] rounded-full animate-pulse"></div>
                <span className="text-xs md:text-sm font-medium text-[#084f5c]">
                  2 minutes to complete
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Business Maturity Assessment
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 leading-relaxed">
                Discover where your business stands and uncover opportunities
                for growth. Get a personalized maturity score with actionable
                insights.
              </p>

              {/* What to Expect */}
              <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                <div className="flex gap-3 md:gap-4">
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-linear-to-br from-[#07c6e8] to-[#06b0cf] flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                      10 Strategic Questions
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                      Covering operations, client acquisition, analytics, and
                      more
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 md:gap-4">
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-linear-to-br from-[#084f5c] to-[#0a5d6d] flex items-center justify-center">
                    <LineChart className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                      Personalized Score
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                      Understand your business maturity level with detailed
                      breakdown
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 md:gap-4">
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                      Detailed Report
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                      Receive tailored recommendations via email
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setCurrentStep('assessment')}
                className="group w-full px-6 md:px-8 py-3.5 md:py-4 bg-[#07c6e8] text-white rounded-xl font-semibold text-base md:text-lg hover:bg-[#06b0cf] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#07c6e8]/25 hover:shadow-xl hover:shadow-[#07c6e8]/30"
              >
                Begin Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Assessment Step */}
        {currentStep === 'assessment' && (
          <div className="min-h-screen md:min-h-[600px] flex flex-col">
            {/* Header with Progress */}
            <div className="border-b border-gray-100">
              {/* Progress Bar */}
              <div className="relative h-1 bg-gray-100">
                <div
                  className="absolute top-0 left-0 h-full bg-linear-to-r from-[#07c6e8] to-[#06b0cf] transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Question Counter & Category */}
              <div className="px-4 sm:px-6 md:px-12 py-4 md:py-6 pr-16 sm:pr-6 md:pr-12">
                <div className="flex items-center justify-between mb-1 md:mb-2">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-xs md:text-sm font-medium text-gray-500">
                      Question {currentQuestionIndex + 1} of {totalQuestions}
                    </span>
                    <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
                    <span className="hidden sm:inline-block px-2 md:px-3 py-0.5 md:py-1 bg-[#07c6e8]/10 text-[#084f5c] rounded-lg text-xs font-semibold">
                      {currentQuestion.category}
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="text-xs md:text-sm font-semibold text-[#07c6e8]">
                      {Math.round(progress)}%
                    </div>
                  </div>
                </div>
                {/* Category badge and progress on mobile (below counter) */}
                <div className="sm:hidden flex items-center justify-between gap-3">
                  <span className="inline-block px-2 py-0.5 bg-[#07c6e8]/10 text-[#084f5c] rounded-lg text-xs font-semibold">
                    {currentQuestion.category}
                  </span>
                  <div className="text-xs font-semibold text-[#07c6e8]">
                    {Math.round(progress)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="flex-1 px-4 sm:px-6 md:px-12 py-6 md:py-10 overflow-y-auto">
              <div className="max-w-3xl mx-auto">
                {/* Question */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-10 leading-tight">
                  {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected =
                      answers[currentQuestion.id] === option.score;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option.score)}
                        className={`group w-full text-left px-4 md:px-6 py-4 md:py-5 rounded-xl md:rounded-2xl border-2 transition-all duration-300 active:scale-[0.98] ${
                          isSelected
                            ? 'border-[#07c6e8] bg-[#07c6e8]/5 shadow-lg shadow-[#07c6e8]/10'
                            : 'border-gray-200 hover:border-[#07c6e8]/50 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 md:gap-4">
                          <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                            {/* Radio indicator */}
                            <div
                              className={`shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#07c6e8] bg-[#07c6e8]'
                                  : 'border-gray-300 group-hover:border-[#07c6e8]/50'
                              }`}
                            >
                              {isSelected && (
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span
                              className={`font-medium transition-colors text-sm md:text-base leading-snug ${
                                isSelected ? 'text-gray-900' : 'text-gray-700'
                              }`}
                            >
                              {option.text}
                            </span>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#07c6e8] shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="border-t border-gray-100 px-4 sm:px-6 md:px-12 py-4 md:py-6 bg-white">
              <div className="max-w-3xl mx-auto flex items-center justify-between">
                <button
                  onClick={goToPrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-1.5 md:gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-600 text-sm md:text-base py-2 px-3 -ml-3 rounded-lg active:bg-gray-100"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Back</span>
                </button>
                {/* Question dots */}
                <div className="flex items-center gap-1.5 md:gap-2">
                  {assessmentQuestions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                        idx === currentQuestionIndex
                          ? 'w-6 md:w-8 bg-[#07c6e8]'
                          : answers[idx + 1] !== undefined
                            ? 'w-1.5 md:w-2 bg-[#07c6e8]/60'
                            : 'w-1.5 md:w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="w-16 md:w-20"></div>{' '}
                {/* Spacer for alignment */}
              </div>
            </div>
          </div>
        )}

        {/* Results Step */}
        {currentStep === 'results' && (
          <div className="p-4 sm:p-6 md:p-12 min-h-screen md:min-h-0 overflow-y-auto custom-scrollbar">
            <div className="max-w-3xl mx-auto w-full">
              {/* Score Circle */}
              <div className="text-center mb-8 md:mb-12 pt-4 md:pt-0">
                <div className="relative flex mb-6 md:mb-8 w-40 h-40 md:w-48 md:h-48 mx-auto">
                  {/* Outer ring */}
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 200 200"
                  >
                    {/* Background circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="12"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="url(#scoreGradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${(score / 100) * 534} 534`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient
                        id="scoreGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#07c6e8" />
                        <stop offset="100%" stopColor="#06b0cf" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Score number */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-br from-[#07c6e8] to-[#084f5c] bg-clip-text text-transparent leading-none">
                        {score}
                      </div>
                      <div className="text-xs md:text-sm font-medium text-gray-500 mt-2">
                        out of 100
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maturity Badge */}
                <div
                  className={`inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl ${maturity.bgColor} ${maturity.borderColor} border-2 mb-4 md:mb-6`}
                >
                  <MaturityIcon
                    className={`w-4 h-4 md:w-5 md:h-5 ${maturity.textColor}`}
                  />
                  <span
                    className={`font-bold text-base md:text-lg ${maturity.textColor}`}
                  >
                    {maturity.level}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
                  {maturity.title}
                </h2>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto px-4">
                  {maturity.description}
                </p>
              </div>

              {/* Category Breakdown */}
              <div className="mb-8 md:mb-12">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">
                  Performance by Category
                </h3>
                <div className="grid gap-3 md:gap-4">
                  {assessmentQuestions.map((q) => {
                    const answer = answers[q.id] || 0;
                    const percentage = (answer / 4) * 100;

                    return (
                      <div
                        key={q.id}
                        className="bg-gray-50 rounded-xl p-3.5 md:p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs md:text-sm font-semibold text-gray-700">
                            {q.category}
                          </span>
                          <span className="text-xs md:text-sm font-bold text-gray-900">
                            {answer}/4
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-[#07c6e8] to-[#06b0cf] transition-all duration-1000 ease-out rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Email Report Section */}
              {!emailSent ? (
                <div className="bg-linear-to-br from-[#084f5c] to-[#0a5d6d] rounded-2xl p-6 md:p-10 text-white">
                  <div className="flex items-start gap-3 md:gap-4 mb-5 md:mb-6">
                    <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-2">
                        Get Your Detailed Report
                      </h3>
                      <p className="text-white/80 leading-relaxed text-sm md:text-base">
                        Receive a comprehensive analysis with personalized
                        recommendations on how Le Beau can elevate your business
                        to the next level.
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSendReport}
                    className="space-y-3 md:space-y-4"
                  >
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl border text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-base md:text-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3.5 md:py-4 bg-white text-[#084f5c] rounded-xl font-semibold text-base md:text-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl active:scale-[0.98] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-[#084f5c]/30 border-t-[#084f5c] rounded-full animate-spin"></div>
                          Sending...
                        </span>
                      ) : (
                        'Send My Report'
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 md:p-8 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-emerald-900 mb-2">
                    Report Sent Successfully!
                  </h3>
                  <p className="text-emerald-700 leading-relaxed text-sm md:text-base">
                    Check your inbox at{' '}
                    <span className="font-semibold break-all">{email}</span> for
                    your detailed business maturity report and personalized
                    recommendations.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8 pb-4 md:pb-0">
                <button
                  onClick={resetAssessment}
                  className="flex-1 px-6 py-3 md:py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm md:text-base active:scale-[0.98] cursor-pointer"
                >
                  Take Again
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 md:py-3.5 bg-[#07c6e8] text-white rounded-xl font-semibold hover:bg-[#06b0cf] transition-all shadow-lg shadow-[#07c6e8]/25 text-sm md:text-base active:scale-[0.98]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
