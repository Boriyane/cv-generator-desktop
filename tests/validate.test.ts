import { describe, expect, it } from 'vitest';
import { validateResume } from '../src/utils/validate';
import { sampleResume } from '../src/types/resume';

describe('validateResume', () => {
  it('accepts a valid resume', () => {
    const result = validateResume(sampleResume);
    expect(result.valid).toBe(true);
  });

  it('flags missing basics', () => {
    const result = validateResume({
      ...sampleResume,
      basics: { ...sampleResume.basics, fullName: '', email: '' }
    });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
