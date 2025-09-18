// validationSchema.js
import * as yup from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

const urlValidator = (value) => {
  if (!value) return true; // allow empty
  try {
    const withProtocol = value.startsWith("http")
      ? value
      : `https://${value}`; // default to https if missing
    const u = new URL(withProtocol);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

const dateOrderTest = (startField, endField) => ({
    name: 'date-order',
    test: function (value) {
        const start = value?.[startField];
        const end = value?.[endField];
        if (!start || !end) return true;

        const s = new Date(start);
        const e = new Date(end);

        if (isNaN(s) || isNaN(e)) {
            return this.createError({
                path: `${this.path}.${endField}`,
                message: `${startField} and ${endField} must be valid dates`,
            });
        }

        if (s > e) {
            return this.createError({
                path: `${this.path}.${endField}`,
                message: `${startField} must be before or equal to ${endField}`,
            });
        }

        return true;
    },
});

export const cvSchema = yup.object({
    fullName: yup.string().required('Full name is required').trim(),
    headline: yup.string().nullable(),
    email: yup.string().required('Email is required').trim().email('Please enter a valid email'),
    phone: yup.string().nullable(),
    website: yup
        .string()
        .nullable()
        .test('is-url', 'Website must start with http:// or https://', urlValidator),
    location: yup.string().nullable(),
    summary: yup.string().nullable(),

    profiles: yup
        .array()
        .of(
            yup.object({
                network: yup.string().nullable(),
                url: yup
                    .string()
                    .nullable()
                    .test('is-url', 'URL must start with http:// or https://', urlValidator),
                username: yup.string().nullable(),
            })
        )
        .nullable(),

    experience: yup
        .array()
        .of(
            yup
                .object({
                    jobTitle: yup.string().nullable(),
                    company: yup.string().nullable(),
                    location: yup.string().nullable(),
                    startDate: yup.date().typeError('Start date must be a valid date').nullable(),
                    endDate: yup.date().typeError('End date must be a valid date').nullable(),
                    description: yup.string().nullable(),
                    currentlyWorking: yup.boolean().nullable(),
                })
                .test({
                    name: 'start-before-end',
                    message: 'startDate must be before or equal to endDate',
                    test: function (obj) {
                        const s = obj?.startDate;
                        const e = obj?.endDate;
                        if (!s || !e) return true;
                        if (new Date(s) <= new Date(e)) return true;

                        return this.createError({
                            path: `${this.path}.endDate`,
                            message: 'Start date must be before or equal to end date',
                        });
                    },
                })
        )
        .nullable(),

    education: yup
        .array()
        .of(
            yup
                .object({
                    institution: yup.string().nullable(),
                    degree: yup.string().nullable(),
                    fieldOfStudy: yup.string().nullable(),
                    startDate: yup.date().typeError('Start date must be a valid date').nullable(),
                    endDate: yup.date().typeError('End date must be a valid date').nullable(),
                    grade: yup.string().nullable(),
                    description: yup.string().nullable(),
                })
                .test(dateOrderTest('startDate', 'endDate'))
        )
        .nullable(),

    skills: yup.array().of(yup.string().trim().nullable()).nullable(),

    languages: yup
        .array()
        .of(
            yup.object({
                language: yup.string().nullable(),
                level: yup
                    .string()
                    .oneOf(['beginner', 'intermediate', 'proficient', 'native', null])
                    .nullable(),
            })
        )
        .nullable(),

    certifications: yup
        .array()
        .of(
            yup
                .object({
                    name: yup.string().nullable(),
                    issuer: yup.string().nullable(),
                    date: yup.date().max(today, 'Certification date must be in the past').nullable(),
                    url: yup
                        .string()
                        .nullable()
                        .test('is-url', 'URL must start with http:// or https://', urlValidator),
                })
        )
        .nullable(),

    projects: yup
        .array()
        .of(
            yup.object({
                name: yup.string().nullable(),
                description: yup.string().nullable(),
                url: yup
                    .string()
                    .nullable()
                    .test('is-url', 'URL must start with http:// or https://', urlValidator),
                technologies: yup
                    .mixed()
                    .transform((val) => {
                        if (typeof val === 'string') {
                            return val
                                .split(',')
                                .map((s) => s.trim())
                                .filter(Boolean);
                        }
                        return Array.isArray(val) ? val : [];
                    })
                    .nullable()

            })
        )
        .nullable(),

    references: yup
        .array()
        .of(
            yup.object({
                name: yup.string().nullable(),
                contact: yup.string().nullable(),
                relationship: yup.string().nullable(),
            })
        )
        .nullable(),
});

export default cvSchema;
