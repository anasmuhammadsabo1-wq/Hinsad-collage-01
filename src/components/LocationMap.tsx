import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Navigation, 
  Sparkles,
  Building,
  Car
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/mockData';

export const LocationMap: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Admission Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-16 sm:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Visit Our Bauchi Campus
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Location &amp; Admissions Helpdesk
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Located along the prominent Gombe Road corridor in Inkil, Bauchi. Reach out or visit for on-campus verification, guided tours, and academic counseling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Details & Interactive Map Viewer */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Campus Address</h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                    Inkil Unguwan Magaji, Gombe Road
                  </p>
                  <p className="text-xs text-slate-500">Bauchi, Bauchi State, Nigeria</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Admissions Hotlines</h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                    {COLLEGE_INFO.phone1}
                  </p>
                  <p className="text-xs text-slate-600">{COLLEGE_INFO.phone2}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Official Email</h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                    {COLLEGE_INFO.email}
                  </p>
                  <p className="text-xs text-slate-500">Response within 24 hours</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Office Hours</h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                    Mon – Fri: 8:00 AM – 4:00 PM
                  </p>
                  <p className="text-xs text-slate-500">Saturday: 9:00 AM – 1:00 PM</p>
                </div>
              </div>
            </div>

            {/* Interactive Embedded Google Maps for Inkil Gombe Road Bauchi */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold font-display">Campus Location Map (Inkil, Gombe Road, Bauchi)</span>
                </div>
                <a
                  href={`https://maps.google.com/?q=Inkil+Bauchi+Gombe+Road`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold underline"
                >
                  Open in Google Maps
                </a>
              </div>
              <div className="relative h-72 w-full bg-slate-100">
                <iframe
                  title="HINSAD College Bauchi Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.3323049175317!2d9.889504515256248!3d10.31580227038166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10ff613768d6d231%3A0xb3e76a603953f47c!2sInkil%2C%20Bauchi!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  className="w-full h-full border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-3.5 bg-slate-50 text-xs text-slate-600 flex items-center gap-2 border-t border-slate-200">
                <Car className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Transport Tip:</strong> Direct commercial cabs and tricycles (Keke NAPEP) are readily available from Bauchi Central Roundabout / Wunti Market along Gombe Road heading towards Inkil.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Direct Admissions Inquiry Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Have a question about screening, course cut-offs, or tuition fees? Our admission officers will respond promptly.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-900">Message Received!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you for reaching out. An admissions counselor will contact you via phone or email within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', phone: '', subject: 'General Admission Inquiry', message: '' });
                    }}
                    className="mt-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Musa Ibrahim"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 08012345678"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subject / Program of Interest
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="General Admission Inquiry">General Admission Inquiry</option>
                      <option value="Community Health (CHEW/JCHEW)">Community Health (CHEW/JCHEW)</option>
                      <option value="Pharmacy Technician (Pharm Tech)">Pharmacy Technician (Pharm Tech)</option>
                      <option value="Medical Laboratory Science (MLT)">Medical Laboratory Science (MLT)</option>
                      <option value="Environmental Health Technology">Environmental Health Technology</option>
                      <option value="Health Information Management">Health Information Management</option>
                      <option value="Tuition Fees & Payment Plans">Tuition Fees &amp; Payment Plans</option>
                      <option value="Result Verification / Transcripts">Result Verification / Transcripts</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message / Question *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your question or request here..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-700/30 hover:shadow-emerald-700/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
