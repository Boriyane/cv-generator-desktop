import { describe, expect, it } from 'vitest';
import { calculateScore } from '../src/utils/score';
import { sampleResume } from '../src/types/resume';

describe('calculateScore', () => {
  it('returns a high score for sample resume', () => {
    const result = calculateScore(sampleResume);
    expect(result.score).toBeGreaterThanOrEqual(80);
  });

  it('returns tips when data is missing', () => {
    const empty = { ...sampleResume, experiences: [], skills: [] };
    const result = calculateScore(empty);
    expect(result.tips.length).toBeGreaterThan(0);
  });
});
