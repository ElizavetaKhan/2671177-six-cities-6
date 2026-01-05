import { describe, it, expect } from 'vitest';
import reviewsProcess from './reviews-process';
import { loadReviews, setReviewsDataLoading } from '../action';
import { Review } from '../../types/review';

const mockReview1: Review = {
  id: '1',
  user: {
    name: 'Test User 1',
    avatarUrl: 'avatar1.jpg',
    isPro: false,
  },
  rating: 4.5,
  comment: 'Great place!',
  date: '2024-01-01T00:00:00.000Z',
};

const mockReview2: Review = {
  id: '2',
  user: {
    name: 'Test User 2',
    avatarUrl: 'avatar2.jpg',
    isPro: true,
  },
  rating: 5.0,
  comment: 'Excellent!',
  date: '2024-01-02T00:00:00.000Z',
};

describe('reviews-process reducer', () => {
  it('should return initial state', () => {
    const state = reviewsProcess(undefined, { type: 'unknown' });
    expect(state).toEqual({
      reviews: [],
      isReviewsDataLoading: false,
    });
  });

  describe('loadReviews', () => {
    it('should load reviews', () => {
      const initialState = {
        reviews: [],
        isReviewsDataLoading: false,
      };
      const reviews: Review[] = [mockReview1, mockReview2];
      const action = loadReviews(reviews);
      const state = reviewsProcess(initialState, action);

      expect(state.reviews).toEqual(reviews);
      expect(state.reviews).toHaveLength(2);
    });

    it('should replace existing reviews', () => {
      const initialState = {
        reviews: [mockReview1],
        isReviewsDataLoading: false,
      };
      const newReviews: Review[] = [mockReview2];
      const action = loadReviews(newReviews);
      const state = reviewsProcess(initialState, action);

      expect(state.reviews).toEqual(newReviews);
      expect(state.reviews).toHaveLength(1);
      expect(state.reviews[0].id).toBe('2');
    });

    it('should handle empty reviews array', () => {
      const initialState = {
        reviews: [mockReview1, mockReview2],
        isReviewsDataLoading: false,
      };
      const action = loadReviews([]);
      const state = reviewsProcess(initialState, action);

      expect(state.reviews).toEqual([]);
      expect(state.reviews).toHaveLength(0);
    });
  });

  describe('setReviewsDataLoading', () => {
    it('should set loading status to true', () => {
      const initialState = {
        reviews: [],
        isReviewsDataLoading: false,
      };
      const action = setReviewsDataLoading(true);
      const state = reviewsProcess(initialState, action);

      expect(state.isReviewsDataLoading).toBe(true);
    });

    it('should set loading status to false', () => {
      const initialState = {
        reviews: [],
        isReviewsDataLoading: true,
      };
      const action = setReviewsDataLoading(false);
      const state = reviewsProcess(initialState, action);

      expect(state.isReviewsDataLoading).toBe(false);
    });

    it('should not affect reviews when setting loading status', () => {
      const initialState = {
        reviews: [mockReview1],
        isReviewsDataLoading: false,
      };
      const action = setReviewsDataLoading(true);
      const state = reviewsProcess(initialState, action);

      expect(state.reviews).toEqual([mockReview1]);
      expect(state.isReviewsDataLoading).toBe(true);
    });
  });
});

