#!/bin/bash

. ./cmd.sh
. ./path.sh
. ./utils/parse_options.sh

for task in test_tedlium; do

skip() {
    steps/make_mfcc.sh --nj 10 data/${task} exp/make_mfcc/test mfcc
    steps/compute_cmvn_stats.sh data/${task} exp/make_mfcc/test mfcc
    utils/fix_data_dir.sh data/${task}

    steps/online/nnet2/extract_ivectors_online.sh --nj 4 --use-vad false \
      data/${task} exp/chain/extractor \
      exp/chain/ivectors_${task}

    steps/nnet3/decode.sh --cmd $decode_cmd --num-threads 1 --nj 10 \
          --online-ivector-dir exp/chain/ivectors_${task} \
          --acwt 1.0 --post-decode-acwt 10.0 \
         exp/chain/tdnn/graph data/${task} exp/chain/tdnn/decode_${task}

    steps/lmrescore_const_arpa.sh data/lang_test data/lang_test_rescore \
        data/${task} exp/chain/tdnn/decode_${task} exp/chain/tdnn/decode_${task}_rescore
}

    rnnlm/lmrescore_pruned.sh --lattice-prune-beam 4 --max-ngram-order 4 \
        data/lang_test exp/rnnlm_out data/${task} \
        exp/chain/tdnn/decode_${task}_rescore exp/chain/tdnn/decode_${task}_rnnlm

done
