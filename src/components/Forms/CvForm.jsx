import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Globe, 
  MapPin, 
  FileText, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Languages, 
  Award, 
  FolderOpen, 
  UserCheck,
  Calendar
} from 'lucide-react';
import ArraySection from '../common/ArraySection';
import FormInput from '../common/FormInput';


export default function CvForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="min-h-screen bg-black text-white p-6 overflow-auto max-h-screen my-scroll-container">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Resume</h1>
          <p className="text-gray-400">Fill in your information to build a professional resume</p>
        </div>

        {/* Personal Information */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Personal Information</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Full Name" icon={User} error={errors.fullName?.message}>
              <input 
                {...register('fullName')} 
                className="w-full p-3 bg-black border border-gray-700 rounded-md focus:border-white focus:outline-none transition-colors" 
                placeholder="John Doe"
              />
            </FormInput>

            <FormInput label="Professional Headline" icon={Briefcase} error={errors.headline?.message}>
              <input 
                {...register('headline')} 
                className="w-full p-3 bg-black border border-gray-700 rounded-md focus:border-white focus:outline-none transition-colors" 
                placeholder="Senior Software Developer"
              />
            </FormInput>

            <FormInput label="Email Address" icon={Mail} error={errors.email?.message}>
              <input 
                {...register('email')} 
                type="email"
                className="w-full p-3 bg-black border border-gray-700 rounded-md focus:border-white focus:outline-none transition-colors" 
                placeholder="john.doe@email.com"
              />
            </FormInput>

            <FormInput label="Website" icon={Globe} error={errors.website?.message}>
              <input 
                {...register('website')} 
                className="w-full p-3 bg-black border border-gray-700 rounded-md focus:border-white focus:outline-none transition-colors" 
                placeholder="https://johndoe.com"
              />
            </FormInput>

            <FormInput label="Location" icon={MapPin} error={errors.location?.message}>
              <input 
                {...register('location')} 
                className="w-full p-3 bg-black border border-gray-700 rounded-md focus:border-white focus:outline-none transition-colors" 
                placeholder="New York, NY"
              />
            </FormInput>
          </div>

          <div className="mt-6">
            <FormInput label="Professional Summary" icon={FileText} error={errors.summary?.message}>
              <textarea 
                {...register('summary')} 
                rows={4}
                className="w-full p-3 bg-black border border-gray-700 rounded-md focus:border-white focus:outline-none transition-colors resize-none" 
                placeholder="Brief description of your professional background and key achievements..."
              />
            </FormInput>
          </div>
        </div>

        {/* Social Profiles */}
        <ArraySection
          name="profiles"
          label="Profiles"
          icon={Users}
          template={{ network: '', url: '', username: '' }}
          renderItem={({ index, fieldName }) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput label="Network" error={errors.profiles?.[index]?.network?.message}>
                <input 
                  {...register(`${fieldName}.network`)} 
                  placeholder="LinkedIn" 
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                />
              </FormInput>
              <FormInput label="URL" error={errors.profiles?.[index]?.url?.message}>
                <input 
                  {...register(`${fieldName}.url`)} 
                  placeholder="https://linkedin.com/in/johndoe" 
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                />
              </FormInput>
              <FormInput label="Username" error={errors.profiles?.[index]?.username?.message}>
                <input 
                  {...register(`${fieldName}.username`)} 
                  placeholder="johndoe" 
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                />
              </FormInput>
            </div>
          )}
        />

        {/* Experience */}
        <ArraySection
          name="experience"
          label="Experience"
          icon={Briefcase}
          template={() => ({ jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '', currentlyWorking: false })}
          renderItem={({ index, fieldName }) => (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Job Title" error={errors.experience?.[index]?.jobTitle?.message}>
                  <input 
                    {...register(`${fieldName}.jobTitle`)} 
                    placeholder="Senior Software Developer" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
                <FormInput label="Company" error={errors.experience?.[index]?.company?.message}>
                  <input 
                    {...register(`${fieldName}.company`)} 
                    placeholder="Tech Corp Inc." 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
              </div>
              
              <FormInput label="Location" error={errors.experience?.[index]?.location?.message}>
                <input 
                  {...register(`${fieldName}.location`)} 
                  placeholder="New York, NY" 
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                />
              </FormInput>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Start Date" icon={Calendar} error={errors.experience?.[index]?.startDate?.message}>
                  <input 
                    {...register(`${fieldName}.startDate`)} 
                    type="date" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
                <FormInput label="End Date" icon={Calendar} error={errors.experience?.[index]?.endDate?.message}>
                  <input 
                    {...register(`${fieldName}.endDate`)} 
                    type="date" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
              </div>

              <FormInput label="Description" error={errors.experience?.[index]?.description?.message}>
                <textarea 
                  {...register(`${fieldName}.description`)} 
                  placeholder="Describe your responsibilities and achievements..." 
                  rows={3}
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors resize-none"
                />
              </FormInput>

              <label className="flex items-center space-x-2 text-sm">
                <input 
                  {...register(`${fieldName}.currentlyWorking`)} 
                  type="checkbox" 
                  className="w-4 h-4 text-white bg-gray-900 border-gray-600 rounded focus:ring-white focus:ring-2"
                />
                <span>Currently working here</span>
              </label>
            </div>
          )}
        />

        {/* Education */}
        <ArraySection
          name="education"
          label="Education"
          icon={GraduationCap}
          template={() => ({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', grade: '', description: '' })}
          renderItem={({ index, fieldName }) => (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Institution" error={errors.education?.[index]?.institution?.message}>
                  <input 
                    {...register(`${fieldName}.institution`)} 
                    placeholder="University of Technology" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
                <FormInput label="Degree" error={errors.education?.[index]?.degree?.message}>
                  <input 
                    {...register(`${fieldName}.degree`)} 
                    placeholder="Bachelor of Science" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
              </div>

              <FormInput label="Field of Study" error={errors.education?.[index]?.fieldOfStudy?.message}>
                <input 
                  {...register(`${fieldName}.fieldOfStudy`)} 
                  placeholder="Computer Science" 
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                />
              </FormInput>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput label="Start Date" icon={Calendar} error={errors.education?.[index]?.startDate?.message}>
                  <input 
                    {...register(`${fieldName}.startDate`)} 
                    type="date" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
                <FormInput label="End Date" icon={Calendar} error={errors.education?.[index]?.endDate?.message}>
                  <input 
                    {...register(`${fieldName}.endDate`)} 
                    type="date" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
                <FormInput label="Grade/GPA" error={errors.education?.[index]?.grade?.message}>
                  <input 
                    {...register(`${fieldName}.grade`)} 
                    placeholder="3.8/4.0" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
              </div>

              <FormInput label="Description" error={errors.education?.[index]?.description?.message}>
                <textarea 
                  {...register(`${fieldName}.description`)} 
                  placeholder="Relevant coursework, achievements, activities..." 
                  rows={2}
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors resize-none"
                />
              </FormInput>
            </div>
          )}
        />

        {/* Skills */}
        <ArraySection
          name="skills"
          label="Skills"
          icon={Code}
          template={() => ('')}
          renderItem={({ index, fieldName }) => (
            <FormInput label="Skill" error={errors.skills?.[index]?.message}>
              <input 
                {...register(`${fieldName}`)} 
                placeholder="React.js, Node.js, Python..." 
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
              />
            </FormInput>
          )}
        />

        {/* Languages */}
        <ArraySection
          name="languages"
          label="Languages"
          icon={Languages}
          template={() => ({ language: '', level: 'beginner' })}
          renderItem={({ index, fieldName }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Language" error={errors.languages?.[index]?.language?.message}>
                <input 
                  {...register(`${fieldName}.language`)} 
                  placeholder="Spanish" 
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                />
              </FormInput>
              <FormInput label="Proficiency Level" error={errors.languages?.[index]?.level?.message}>
                <select 
                  {...register(`${fieldName}.level`)} 
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="proficient">Proficient</option>
                  <option value="native">Native</option>
                </select>
              </FormInput>
            </div>
          )}
        />

        {/* Certifications */}
        <ArraySection
          name="certifications"
          label="Certifications"
          icon={Award}
          template={() => ({ name: '', issuer: '', date: '', url: '' })}
          renderItem={({ index, fieldName }) => (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Certification Name" error={errors.certifications?.[index]?.name?.message}>
                  <input 
                    {...register(`${fieldName}.name`)} 
                    placeholder="AWS Certified Solutions Architect" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
                <FormInput label="Issuing Organization" error={errors.certifications?.[index]?.issuer?.message}>
                  <input 
                    {...register(`${fieldName}.issuer`)} 
                    placeholder="Amazon Web Services" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Issue Date" icon={Calendar} error={errors.certifications?.[index]?.date?.message}>
                  <input 
                    {...register(`${fieldName}.date`)} 
                    type="date" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
                <FormInput label="Credential URL" error={errors.certifications?.[index]?.url?.message}>
                  <input 
                    {...register(`${fieldName}.url`)} 
                    placeholder="https://credential-url.com" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
              </div>
            </div>
          )}
        />

        {/* Projects */}
        <ArraySection
          name="projects"
          label="Projects"
          icon={FolderOpen}
          template={() => ({ name: '', description: '', url: '', technologies: [] })}
          renderItem={({ index, fieldName }) => (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Project Name" error={errors.projects?.[index]?.name?.message}>
                  <input 
                    {...register(`${fieldName}.name`)} 
                    placeholder="E-commerce Platform" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
                <FormInput label="Project URL" error={errors.projects?.[index]?.url?.message}>
                  <input 
                    {...register(`${fieldName}.url`)} 
                    placeholder="https://github.com/username/project" 
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                  />
                </FormInput>
              </div>

              <FormInput label="Description" error={errors.projects?.[index]?.description?.message}>
                <textarea 
                  {...register(`${fieldName}.description`)} 
                  placeholder="Describe the project and your role..." 
                  rows={3}
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors resize-none"
                />
              </FormInput>

              <FormInput label="Technologies Used" error={errors.projects?.[index]?.technologies?.message}>
                <input 
                  {...register(`${fieldName}.technologies`)} 
                  placeholder="React, Node.js, MongoDB, AWS" 
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                />
              </FormInput>
            </div>
          )}
        />

        {/* References */}
        <ArraySection
          name="references"
          label="References"
          icon={UserCheck}
          template={() => ({ name: '', contact: '', relationship: '' })}
          renderItem={({ index, fieldName }) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput label="Full Name" error={errors.references?.[index]?.name?.message}>
                <input 
                  {...register(`${fieldName}.name`)} 
                  placeholder="Jane Smith" 
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                />
              </FormInput>
              <FormInput label="Contact Information" error={errors.references?.[index]?.contact?.message}>
                <input 
                  {...register(`${fieldName}.contact`)} 
                  placeholder="jane@company.com" 
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                />
              </FormInput>
              <FormInput label="Relationship" error={errors.references?.[index]?.relationship?.message}>
                <input 
                  {...register(`${fieldName}.relationship`)} 
                  placeholder="Former Manager" 
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:border-white focus:outline-none transition-colors"
                />
              </FormInput>
            </div>
          )}
        />
      </div>
    </div>
  );
}
