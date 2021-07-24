<template>
   <div class= "container mt-5">
    <div class= "row">
        <div class="col-md-12">
            <div class= "card border-0 rounded shadow">
                <div class="card-body">
                    <h4 class="fw-bold text-center">EDIT POST</h4>
                    <hr>

                   <form @submit.prevent="update">
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
import { reactive, ref, onMounted} from "vue";
import { useRouter, useRoute } from "vue-router";
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

    //vue route
    const route = useRoute();

  

    onMounted(() => {
    axios.get(`http://localhost:8000/api/D112012119_dosen/${route.params.id}`)
    .then((response) => {
        post.ktp_dosen = response.data.data.ktp_dosen
        post.nama_dosen = response.data.data.nama_dosen
        post.alamat_dosen = response.data.data.alamat_dosen
        post.email_dosen = response.data.data.email_dosen
        post.notlp_dosen = response.data.data.notlp_dosen
        post.bidang_dosen = response.data.data.bidang_dosen
        post.jadwal_dosen = response.data.data.jadwal_dosen
    }).catch(error =>{
        console.log(error.response.data)
    })
    })

    //method update
    function update(){
        let ktp_dosen = post.ktp_dosen;
        let nama_dosen = post.nama_dosen;
        let alamat_dosen = post.alamat_dosen;
        let email_dosen = post.email_dosen;
        let notlp_dosen = post.notlp_dosen;
        let bidang_dosen = post.bidang_dosen;
        let jadwal_dosen = post.jadwal_dosen;

        axios.put(`http://localhost:8000/api/D112012119_dosen/${route.params.id}`,
        {
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
        update,
    }

    

   }
}
</script>