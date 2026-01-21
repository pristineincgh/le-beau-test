'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { AssessmentModal } from '@/components/shared/AssessmentModal';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { ArrowRight, Award, Check, Clock } from 'lucide-react';
import { useState } from 'react';

const BreakFree = ({ benefits }: { benefits: string[] }) => {
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);

  return (
    <>
      <AnimatedSection delay={0.1}>
        <section className="py-20 md:py-28 bg-linear-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Reclaim your time. Focus on your craft.
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Maintain full control over what matters most and avoid getting
                  overwhelmed. Le Beau gives you back your time so you can focus
                  on delivering exceptional experiences to your clients.
                </p>
                <ul className="space-y-4 mb-8">
                  {benefits.slice(0, 4).map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-6 h-6 text-[#07c6e8] mr-3 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Assessment CTA */}
                <div className="bg-linear-to-br from-[#07c6e8]/10 to-[#084f5c]/5 rounded-2xl p-6 border-2 border-[#07c6e8]/20">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-linear-to-br from-[#07c6e8] to-[#06b0cf] rounded-xl flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Start a Business Assessment
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        See how Le Beau can help you improve your services. Take
                        our quick 2-minute assessment and get a personalized
                        maturity score.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAssessmentModal(true)}
                    className="w-full sm:w-auto px-6 py-3 bg-[#07c6e8] text-white rounded-lg font-semibold hover:bg-[#06b0cf] transition-all flex items-center justify-center gap-2 group"
                  >
                    Start Assessment
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1759134248487-e8baaf31e33e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMHByb2Zlc3Npb25hbCUyMGhhcHB5JTIwY2xpZW50fGVufDF8fHx8MTc2ODA4NjA3NHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Beauty professional with client"
                  className="w-full h-auto rounded-2xl shadow-xl"
                  width={1080}
                  height={686}
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg hidden md:block">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-8 h-8 text-[#07c6e8]" />
                    <div className="text-3xl font-bold text-gray-900">
                      15hrs
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Saved per week</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {showAssessmentModal && (
        <AssessmentModal
          isOpen={showAssessmentModal}
          onClose={() => setShowAssessmentModal(false)}
        />
      )}
    </>
  );
};

export default BreakFree;
