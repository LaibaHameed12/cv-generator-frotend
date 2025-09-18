import React, { useRef } from "react";

// Utility: format dates
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

const cleanText = (text) => (text ? text.toString().trim() : "");

export default function CvPreview({ cv }) {
  const previewRef = useRef(null);

  if (!cv || Object.keys(cv).length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 border border-gray-200 text-center text-gray-500">
        <h3 className="text-lg font-medium mb-2">Resume Preview</h3>
        <p>Start filling out the form to see your professional resume preview here.</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white px-8">
        <div
          ref={previewRef}
          className="cv-container text-black"
          style={{
            fontFamily: "Times New Roman, serif",
            fontSize: "11pt",
            lineHeight: "1.5",
          }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold uppercase">{cleanText(cv.fullName)}</h1>
            {cv.headline && <p className="italic text-gray-700 capitalize">{cleanText(cv.headline)}</p>}

            <p className="text-sm text-gray-600 mt-2 space-x-1">
              {cv.email && <span>{cv.email} • </span>}
              {cv.phone && <span>{cv.phone} • </span>}
              {cv.location && <span className="capitalize">{cv.location} • </span>}
              {cv.website && (
                <a
                  href={cv.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Portfolio
                </a>
              )}
              {/* Add profiles inline */}
              {cv.profiles?.length > 0 &&
                cv.profiles
                  .filter((p) => p && p.network && p.url)
                  .map((p, i) => (
                    <span key={i}>
                      {" • "}
                      <a
                        href={p.url.startsWith("http") ? p.url : `https://${p.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {cleanText(p.network)}
                      </a>
                    </span>
                  ))}
            </p>
          </div>


          {/* Summary */}
          {cv.summary && (
            <div className="mb-5">
              <h2 className="font-bold uppercase border-b border-gray-400 mb-2 text-sm">Summary</h2>
              <p className="text-justify ">{cleanText(cv.summary)}</p>
            </div>
          )}

          {/* Experience */}
          {cv.experience?.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold uppercase border-b border-gray-400 mb-2 text-sm">Experience</h2>
              {cv.experience.map((exp, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold capitalize">{cleanText(exp.jobTitle)}</p>
                      <p className="text-gray-700 capitalize">{cleanText(exp.company)}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {exp.startDate &&
                        `${formatDate(exp.startDate)} - ${exp.currentlyWorking ? "Present" : formatDate(exp.endDate)
                        }`}
                    </p>
                  </div>
                  {exp.location && <p className="text-sm text-gray-600 capitalize">{cleanText(exp.location)}</p>}
                  {exp.description && (
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                      {exp.description.split("\n").map((d, idx) => (
                        <li key={idx}>{cleanText(d)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {cv.education?.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold uppercase border-b border-gray-400 mb-2 text-sm">Education</h2>
              {cv.education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">
                        {cleanText(edu.degree)} {edu.fieldOfStudy && `in ${cleanText(edu.fieldOfStudy)}`}
                      </p>
                      <p className="text-gray-700">{cleanText(edu.institution)}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {edu.startDate && `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`}
                    </p>
                  </div>
                  {edu.grade && <p className="text-sm text-gray-600">GPA: {cleanText(edu.grade)}</p>}
                  {edu.description && (
                    <p className="text-sm text-gray-700 mt-1">{cleanText(edu.description)}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {cv.skills?.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold uppercase border-b border-gray-400 mb-2 text-sm">Skills</h2>
              <ul className="list-disc list-inside text-sm text-gray-700 capitalize">
                {cv.skills.filter((s) => s && s.trim()).map((s, i) => (
                  <li key={i}>{cleanText(s)}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {cv.languages?.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold uppercase border-b border-gray-400 mb-2 text-sm">Languages</h2>
              <ul className="list-disc list-inside text-sm text-gray-700 capitalize">
                {cv.languages
                  .filter((l) => l?.language)
                  .map((l, i) => (
                    <li key={i}>
                      {cleanText(l.language)} {l.level && `(${cleanText(l.level)})`}
                    </li>
                  ))}
              </ul>
            </div>
          )}


          {/* Certifications */}
          {cv.certifications?.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold uppercase border-b border-gray-400 mb-2 text-sm">Certifications</h2>
              <ul className="list-disc list-inside text-sm text-gray-700 capitalize">
                {cv.certifications.map((cert, i) => (
                  <li key={i}>
                    <span className="font-medium capitalize">{cleanText(cert.name)}</span>, {cleanText(cert.issuer)}{" "}
                    {cert.date && `(${formatDate(cert.date)})`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects */}
          {cv.projects?.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold uppercase border-b border-gray-400 mb-2 text-sm">Projects</h2>
              {cv.projects.map((p, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold flex items-center justify-between capitalize">
                    {i + 1}. {cleanText(p.name)}
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 font-normal hover:underline"
                      >
                        Live Preview
                      </a>
                    )}
                  </p>
                  {p.description && (
                    <p className="text-sm text-gray-700">{cleanText(p.description)}</p>
                  )}
                  {p.technologies && (
                    <p className="text-sm text-gray-600">
                      <strong>Technologies:</strong>{" "}
                      {Array.isArray(p.technologies)
                        ? p.technologies.filter((t) => t && t.trim()).join(" , ")
                        : cleanText(p.technologies)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}



          {/* References */}
          {cv.references?.length > 0 && (
            <div>
              <h2 className="font-bold uppercase border-b border-gray-400 mb-2 text-sm">References</h2>
              {cv.references.map((r, i) => (
                <p key={i} >
                  <span className="font-medium capitalize">{cleanText(r.name)}</span> — {cleanText(r.relationship)}
                  <br />
                  ({cleanText(r.contact)})
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
