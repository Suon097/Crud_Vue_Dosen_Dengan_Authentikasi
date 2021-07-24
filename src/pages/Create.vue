<template>
<div class= "container mt-5">
    <div class= "row">
        <div class="col-md-12">
            <div class= "card border-0 rounded Shadow">
                <div class="card-body">
                    <h4 class="fw-bold text-center">TAMBAH POST</h4>
                    <hr>

                   <form @submit.prevent="store">
                       <div class="form-group">
                           <label for="title"  class="font-weight-bold">KTP DOSEN</label>
                           <input type="text" class="form-control" v-model="post.ktp_dosen" placeholder="Masukkan Nomor KTP Dosen">
                           <!-- validation -->
                            <div v-if="validation.ktp_dosen" class="mt-2 alert alert-danger">
                            {{validation.ktp_dosen[0]}}
                            </div>
                       </div>
                       <div class="form-group">
                           <label for="title"  class="font-weight-bold">NAMA DOSEN</label>
                           <input type="text" class="form-control" v-model="post.nama_dosen" placeholder="Masukkan Nama Dosen">
                           <!-- validation -->
                            <div v-if="validation.nama_dosen" class="mt-2 alert alert-danger">
                            {{validation.nama_dosen[0]}}
                            </div>
                       </div>
                       <div class="form-group">
                           <label for="title"  class="font-weight-bold">ALAMAT DOSEN</label>
                           <input type="text" class="form-control" v-model="post.alamat_dosen" placeholder="Masukkan Alamat Dosen">
                           <!-- validation -->
                            <div v-if="validation.alamat_dosen" class="mt-2 alert alert-danger">
                            {{validation.alamat_dosen[0]}}
                            </div>
                       </div>
                       <div class="form-group">
                           <label for="title"  class="font-weight-bold">EMAIL DOSEN</label>
                           <input type="text" class="form-control" v-model="post.email_dosen" placeholder="Masukkan Email Dosen">
                           <!-- validation -->
                            <div v-if="validation.email_dosen" class="mt-2 alert alert-danger">
                            {{validation.email_dosen[0]}}
                            </div>
                       </div>
                       <div class="form-group">
                           <label for="title"  class="font-weight-bold">NOTLP DOSEN</label>
                           <input type="text" class="form-control" v-model="post.notlp_dosen" placeholder="Masukkan Notlp Dosen">
                           <!-- validation -->
                            <div v-if="validation.notlp_dosen" class="mt-2 alert alert-danger">
                            {{validation.notlp_dosen[0]}}
                            </div>
                       </div>
                       <div class="form-group">
                           <label for="title"  class="font-weight-bold">BIDANG DOSEN</label>
                           <input type="text" class="form-control" v-model="post.bidang_dosen" placeholder="Masukkan Bidang Dosen">
                           <!-- validation -->
                            <div v-if="validation.bidang_dosen" class="mt-2 alert alert-danger">
                            {{validation.bidang_dosen[0]}}
                            </div>
                       </div>
                       <div class="form-group">
                           <label for="title"  class="font-weight-bold">JADWAL DOSEN</label>
                           <input type="text" class="form-control" v-model="post.jadwal_dosen" placeholder="Masukkan Jadwal Dosen">
                           <!-- validation -->
                            <div v-if="validation.jadwal_dosen" class="mt-2 alert alert-danger">
                            {{validation.jadwal_dosen[0]}}
                            </div>
                       </div>
                    <button type="submit" class="btn btn-primary">SIMPAN</button>
                   </form>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import { reactive, ref} from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
   setup() {
    //state posts
    const post = reactive({
       ktp_dosen: '',
        nama_dosen: '',
        alamat_dosen: '',
        email_dosen: '',
        notlp_dosen: '',
        bidang_dosen: '',
        jadwal_dosen: '',
    });

    //state validation
    const validation = ref([]);

    //vue router
    const router = useRouter();

    //method store
    function store(){
          let ktp_dosen = post.ktp_dosen;
        let nama_dosen = post.nama_dosen;
        let alamat_dosen = post.alamat_dosen;
        let email_dosen = post.email_dosen;
        let notlp_dosen = post.notlp_dosen;
        let bidang_dosen = post.bidang_dosen;
        let jadwal_dosen = post.jadwal_dosen;

        axios 
            .post("http://localhost:8000/api/D112012119_dosen/",{
              ktp_dosen: ktp_dosen,
            nama_dosen: nama_dosen,
            alamat_dosen: alamat_dosen,
            email_dosen: email_dosen,
            notlp_dosen: notlp_dosen,
            bidang_dosen: bidang_dosen,
            jadwal_dosen: jadwal_dosen,
            })
            .then(() => {
                //redirect ke post index
                router.push({
                    name: "post.index",
                });
            })
            .catch((error) => {
                //assign state validation with error
                validation.value = error.response.data;

            });

    }

    //return
    return{
        post,
        validation,
        router, 
        store,
    };

    

   },
};
</script>