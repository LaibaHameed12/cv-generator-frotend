import React, { useRef } from 'react';
import { 
  Download, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Calendar,
  ExternalLink,
  Award,
  Code,
  MessageSquare,
  Users,
  FolderOpen
} from 'lucide-react';
import Link from 'next/link';

// Utility function to format dates
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

// Utility function to clean and format text
const cleanText = (text) => {
  if (!text) return '';
  return text.toString().trim();
};

export default function CvPreview({ cv }) {
  const previewRef = useRef(null);

  if (!cv || Object.keys(cv).length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
        <div className="text-center text-gray-400">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">Resume Preview</h3>
          <p>Start filling out the form to see your professional resume preview here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* CV Content */}
      <h1 className='text-white font-semibold pb-6' >Preview</h1>
      <div className="p-6 bg-white">
        <div ref={previewRef} className="cv-container bg-white text-black" style={{ fontFamily: 'Times New Roman, serif', fontSize: '11pt', lineHeight: '1.4' }}>
          
          {/* Header Section */}
          <div className="header mb-6">
            <h1 className="name text-2xl font-bold text-gray-900 mb-1">
              {cleanText(cv.fullName) || 'Full Name'}
            </h1>
            
            {cv.headline && (
              <div className="headline text-base italic text-gray-700 mb-2">
                {cleanText(cv.headline)}
              </div>
            )}
            
            <div className="contact-info text-sm text-gray-600 space-y-1">
              <div className="flex flex-wrap items-center gap-4">
                {cv.email && (
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3" />
                    <span>{cleanText(cv.email)}</span>
                  </div>
                )}
                {cv.phone && (
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>{cleanText(cv.phone)}</span>
                  </div>
                )}
                {cv.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{cleanText(cv.location)}</span>
                  </div>
                )}
                {cv.website && (
                  <div className="flex items-center space-x-1">
                    <Globe className="w-3 h-3" />
                    <span>{cleanText(cv.website)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          {cv.summary && (
            <div className="section mb-6">
              <h2 className="section-title text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Summary
              </h2>
              <p className="text-justify leading-relaxed">
                {cleanText(cv.summary)}
              </p>
            </div>
          )}

          {/* Experience */}
          {cv.experience && cv.experience.length > 0 && (
            <div className="section mb-6">
              <h2 className="section-title text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Experience
              </h2>
              <div className="space-y-4">
                {cv.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <div className="job-title font-semibold text-base">
                          {cleanText(exp.jobTitle)}
                        </div>
                        <div className="company font-medium text-gray-800">
                          {cleanText(exp.company)}
                        </div>
                      </div>
                      <div className="date-location text-right text-sm text-gray-600">
                        {exp.startDate && (
                          <div className="flex items-center justify-end space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                            </span>
                          </div>
                        )}
                        {exp.location && (
                          <div className="flex items-center justify-end space-x-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            <span>{cleanText(exp.location)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="description text-sm text-gray-700 mt-2 leading-relaxed">
                        {cleanText(exp.description)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {cv.education && cv.education.length > 0 && (
            <div className="section mb-6">
              <h2 className="section-title text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Education
              </h2>
              <div className="space-y-4">
                {cv.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <div className="degree font-semibold text-base">
                          {cleanText(edu.degree)} {edu.fieldOfStudy && `in ${cleanText(edu.fieldOfStudy)}`}
                        </div>
                        <div className="institution font-medium text-gray-800">
                          {cleanText(edu.institution)}
                        </div>
                        {edu.grade && (
                          <div className="grade text-sm text-gray-600">
                            GPA: {cleanText(edu.grade)}
                          </div>
                        )}
                      </div>
                      <div className="date-location text-right text-sm text-gray-600">
                        {edu.startDate && (
                          <div className="flex items-center justify-end space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {edu.description && (
                      <div className="description text-sm text-gray-700 mt-2 leading-relaxed">
                        {cleanText(edu.description)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {cv.skills && cv.skills.length > 0 && (
            <div className="section mb-6">
              <h2 className="section-title text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3 flex items-center space-x-1">
                {/* <Code className="w-4 h-4" /> */}
                <span>Technical Skills</span>
              </h2>
              <div className="skills-list">
                <p className="leading-relaxed">
                  {cv.skills.filter(skill => skill && skill.trim()).map((skill, index) => (
                    <span key={index} className="skill-item">
                      {cleanText(skill)}{index < cv.skills.filter(s => s && s.trim()).length - 1 ? ' • ' : ''}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          )}

          {/* Languages */}
          {cv.languages && cv.languages.length > 0 && (
            <div className="section mb-6">
              <h2 className="section-title text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3 flex items-center space-x-1">
                {/* <MessageSquare className="w-4 h-4" /> */}
                <span>Languages</span>
              </h2>
              <div className="languages-list">
                <p className="leading-relaxed">
                  {cv.languages.filter(lang => lang && lang.language).map((lang, index) => (
                    <span key={index} className="language-item">
                      {cleanText(lang.language)} ({cleanText(lang.level)}){index < cv.languages.filter(l => l && l.language).length - 1 ? ' • ' : ''}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          )}

          {/* Certifications */}
          {cv.certifications && cv.certifications.length > 0 && (
            <div className="section mb-6">
              <h2 className="section-title text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3 flex items-center space-x-1">
                {/* <Award className="w-4 h-4" /> */}
                <span>Certifications</span>
              </h2>
              <div className="space-y-2">
                {cv.certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium">
                        {cleanText(cert.name)}
                      </div>
                      <div className="text-sm text-gray-700">
                        {cleanText(cert.issuer)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(cert.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {cv.projects && cv.projects.length > 0 && (
            <div className="section mb-6">
              <h2 className="section-title text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3 flex items-center space-x-1">
                {/* <FolderOpen className="w-4 h-4" /> */}
                <span> Projects</span>
              </h2>
              <div className="space-y-4">
                {cv.projects.map((project, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-semibold text-base">
                        {cleanText(project.name)}
                      </div>
                      {project.url && (
                        <Link href={project.url} className="text-sm text-gray-600 flex items-center space-x-1">
                          <ExternalLink className="w-3 h-3" />
                          <span>View Project</span>
                        </Link>
                      )}
                    </div>
                    {project.description && (
                      <div className="description text-sm text-gray-700 mb-2 leading-relaxed">
                        {cleanText(project.description)}
                      </div>
                    )}
                    {project.technologies && (
                      <div className="technologies text-sm text-gray-600">
                        <strong>Technologies:</strong> {
                          Array.isArray(project.technologies) 
                            ? project.technologies.filter(tech => tech && tech.trim()).join(' • ')
                            : cleanText(project.technologies)
                        }
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Profiles */}
          {cv.profiles && cv.profiles.length > 0 && (
            <div className="section mb-6">
              <h2 className="section-title text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3 flex items-center space-x-1">
                {/* <Users className="w-4 h-4" /> */}
                <span>Professional Profiles</span>
              </h2>
              <div className="space-y-2">
                {cv.profiles.filter(profile => profile && profile.network).map((profile, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <span className="font-medium">{cleanText(profile.network)}:</span>
                    <span className="text-gray-700">{cleanText(profile.url || profile.username)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {cv.references && cv.references.length > 0 && (
            <div className="section mb-6">
              <h2 className="section-title text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-3 flex items-center space-x-1">
                {/* <Users className="w-4 h-4" /> */}
                <span>References</span>
              </h2>
              <div className="space-y-3">
                {cv.references.filter(ref => ref && ref.name).map((ref, index) => (
                  <div key={index}>
                    <div className="font-medium">{cleanText(ref.name)}</div>
                    <div className="text-sm text-gray-700">{cleanText(ref.relationship)}</div>
                    <div className="text-sm text-gray-600">{cleanText(ref.contact)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}