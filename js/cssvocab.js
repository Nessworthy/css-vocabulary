$(document).ready(function() {
  var vocabForHumans = [
    'Comment',
    'Statement',
    'Rule set',
    'At rule',
    'Declaration block',
    'Selector',
    'Simple selector',
    'ID selector',
    'Class selector',
    'Attribute selector',
    'Pseudo-class',
    'Pseudo-element',
    'Combinator',
    'Declaration',
    'Property',
    'Value',
    'Function',
    'Keyword',
    'Identifier',
    'String',
    'Url',
    'Number',
    'Percentage',
    'Length',
    'Unit',
    'Color',
    'Vendor prefix'
  ],
  vocab = [];
  
  // Create slugs from vocab strings.
  function buildVocabSlugs (vocabForHumans) {
    var vocabSlugs = [],
        slug;
    for (var i = 0; i < vocabForHumans.length; i++) {
      slug = vocabForHumans[i].toLowerCase().replace(' ', '-');
      vocalSlugs.push(slug);
    }
    return vocabSlugs;
  }
  vocab = buildVocabSlugs(vocabForHumans);
  
  //Build vocab list in the sidebar
  function buildVocabList (vocab, vocabForHumans) {
    var vocabList = $('.vocabList');
    for (var i = 0; i < vocab.length; i++) {
      vocabList.append('<li class="'+vocab[i]+'" tabindex="0">'+vocabForHumans[i]+'</li>');
    }
  }
  buildVocabList(vocab, vocabForHumans);

  function buildVocabSelect (vocab, vocabForHumans) {
    var vocabSelect = $('.vocabSelect');
    for (var i = 0; i < vocab.length; i++) {
      vocabSelect.append('<option value="'+vocab[i]+'">'+vocabForHumans[i]+'</option>');
    }
  }
  buildVocabSelect(vocab, vocabForHumans);

  var selectable = '.' + vocab.join(', .');
  var selectableCSS = '.css .' + vocab.join(', .css .');
  var selectableVocab = '.vocabList .' + vocab.join(', .vocabList .');

  $(selectableCSS).on('mouseover', function(event) {
    event.stopPropagation();
    $('.hover').removeClass('hover');
    $(this).addClass('hover');
  });

  $(selectableCSS).on('focus click', function(event) {
    event.stopPropagation();

    $('.content').addClass('focus');
    $('.sidebar').removeClass('focus');

    var whatIsThis = $(this).attr('class');
    whatIsThis = whatIsThis.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    var pals = whatIsThis.split(' ');
    console.log('.css ' + '.' + pals.join('.'));
    var $cssPals = $('.css ' + '.' + pals.join('.'));
    var vocabPalsSelector = '.vocabList .' + pals.join(', .vocabList .');
    $vocabPals = $(vocabPalsSelector);

    $('.hilite').removeClass('hilite');
    $('.selected').removeClass('selected');
    $cssPals.addClass('hilite');
    $(this).addClass('selected');
    $vocabPals.addClass('selected');
  });

  $(selectableVocab).on('focus click', function(event) {
    event.stopPropagation();

    $('.sidebar').addClass('focus');
    $('.content').removeClass('focus');

    var whatIsThis = $(this).attr('class');
    whatIsThis = whatIsThis.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    var $cssPals = $('.css .' + whatIsThis);

    $('.hilite').removeClass('hilite');
    $('.selected').removeClass('selected');
    $cssPals.addClass('hilite');
    $(this).addClass('selected');
  });

  $(selectable).attr('tabindex', '0');
  //$('.vocabList .property').focus();

  key('up', function(event){
    var vocabFocus = $('.vocabList :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.prev().focus();
    }
  });
  key('down', function(event){
    var vocabFocus = $('.vocabList :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.next().focus();
    }
  });

  $('.sidebar-hide-btn').on('click touchstart', function(event) {
    event.preventDefault();
    console.log('hide sidebar');
    $('body').addClass('sidebar-hide');
  });
  $('.sidebar-show-btn').on('click touchstart', function(event) {
    console.log('show sidebar');
    event.preventDefault();
    $('body').removeClass('sidebar-hide');
  });

});
