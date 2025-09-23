/**
 * HTML5 Semântico — Guia Rápido
 * JavaScript functionality for search and copy features
 * Follows accessibility best practices and progressive enhancement
 */

(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeCopyButtons();
  });

  /**
   * Initialize search functionality
   * Filters cards based on search input with debouncing
   */
  function initializeSearch() {
    const searchInput = document.getElementById('busca');
    const counter = document.getElementById('contagem');
    const cards = document.querySelectorAll('[data-index]');
    const sections = document.querySelectorAll('section.section');

    if (!searchInput || !counter) return;

    let debounceTimer;

    searchInput.addEventListener('input', function(e) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        performSearch(e.target.value.toLowerCase().trim());
      }, 250);
    });

    function performSearch(query) {
      let visibleCount = 0;
      let visibleSections = 0;

      sections.forEach(section => {
        const sectionCards = section.querySelectorAll('[data-index]');
        let sectionHasVisibleCards = false;

        sectionCards.forEach(card => {
          const searchableText = card.getAttribute('data-index') || '';
          const shouldShow = !query || searchableText.toLowerCase().includes(query);

          card.style.display = shouldShow ? '' : 'none';

          if (shouldShow) {
            visibleCount++;
            sectionHasVisibleCards = true;
          }
        });

        // Show/hide section based on whether it has visible cards
        if (section.id !== 'conteudo' && sectionCards.length > 0) {
          section.style.display = sectionHasVisibleCards ? '' : 'none';
          if (sectionHasVisibleCards) visibleSections++;
        }
      });

      // Update counter with proper pluralization and semantics
      updateCounter(query, visibleCount, visibleSections);
    }

    function updateCounter(query, cardCount, sectionCount) {
      let message;

      if (!query) {
        message = 'Mostrando todas as seções';
      } else if (cardCount === 0) {
        message = `Nenhum resultado para "${query}"`;
      } else if (cardCount === 1) {
        message = `1 resultado encontrado`;
      } else {
        const sectionText = sectionCount === 1 ? 'seção' : 'seções';
        message = `${cardCount} resultados em ${sectionCount} ${sectionText}`;
      }

      counter.textContent = message;

      // Announce to screen readers
      if (query && counter.getAttribute('aria-live') === 'polite') {
        // Temporarily change to assertive for immediate feedback
        counter.setAttribute('aria-live', 'assertive');
        setTimeout(() => {
          counter.setAttribute('aria-live', 'polite');
        }, 100);
      }
    }
  }

  /**
   * Initialize copy-to-clipboard functionality
   * Uses modern Clipboard API with fallback
   */
  function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn[data-copy]');

    copyButtons.forEach(button => {
      button.addEventListener('click', handleCopy);

      // Add keyboard support
      button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCopy.call(this, e);
        }
      });
    });

    async function handleCopy(e) {
      const button = e.currentTarget;
      const codeBlock = button.nextElementSibling || button.parentElement.querySelector('code');

      if (!codeBlock) return;

      try {
        const textToCopy = codeBlock.textContent || codeBlock.innerText;

        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for older browsers or non-HTTPS
          fallbackCopy(textToCopy);
        }

        showCopyFeedback(button, true);
      } catch (error) {
        console.warn('Copy failed:', error);
        showCopyFeedback(button, false);
      }
    }

    function fallbackCopy(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (error) {
        document.body.removeChild(textArea);
        throw error;
      }
    }

    function showCopyFeedback(button, success) {
      const originalText = button.textContent;
      const feedbackText = success ? 'Copiado!' : 'Erro ao copiar';

      button.textContent = feedbackText;
      button.setAttribute('aria-label', feedbackText);

      // Add visual feedback class
      button.classList.add(success ? 'copy-success' : 'copy-error');

      setTimeout(() => {
        button.textContent = originalText;
        button.removeAttribute('aria-label');
        button.classList.remove('copy-success', 'copy-error');
      }, 2000);
    }
  }

  /**
   * Enhance accessibility for dynamic content
   */
  function enhanceAccessibility() {
    // Ensure skip links work properly
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Add focus management for navigation chips
    const chips = document.querySelectorAll('.chip[href^="#"]');
    chips.forEach(chip => {
      chip.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          const heading = target.querySelector('h2, h3, h4, h5, h6');
          if (heading) {
            heading.focus();
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // Initialize accessibility enhancements
  document.addEventListener('DOMContentLoaded', enhanceAccessibility);

})();