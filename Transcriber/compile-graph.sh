#!/bin/bash

. path.sh

set -x

rm -rf data/*.lm.gz data/lang_local data/dict data/lang data/lang_test data/lang_test_rescore
rm -rf exp/lgraph
rm -rf exp/graph

mkdir -p data/dict
cp db/phone/* data/dict
./dict.py > data/dict/lexicon.txt

ngram-count -wbdiscount -order 4 -text db/extra.txt -lm data/extra.lm.gz
ngram -order 4 -lm db/en-230k-0.5.lm.gz -mix-lm data/extra.lm.gz -lambda 0.95 -write-lm data/en-mix.lm.gz
ngram -order 4 -lm data/en-mix.lm.gz -prune 3e-8 -write-lm data/en-mixp.lm.gz
ngram -lm data/en-mixp.lm.gz -write-lm data/en-mix-small.lm.gz

utils/prepare_lang.sh data/dict "[unk]" data/lang_local data/lang
utils/format_lm.sh data/lang data/en-mix-small.lm.gz data/dict/lexicon.txt data/lang_test
utils/mkgraph.sh --self-loop-scale 1.0 data/lang_test exp/chain/tdnn exp/chain/tdnn/graph
utils/build_const_arpa_lm.sh data/en-mix.lm.gz data/lang_test data/lang_test_rescore

rnnlm/change_vocab.sh data/lang/words.txt exp/rnnlm exp/rnnlm_out
